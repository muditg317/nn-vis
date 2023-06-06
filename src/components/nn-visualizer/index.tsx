import { useCallback, useState } from "react";
import {type Closeable, type Tab} from "~/components/tab-view";
import useModelReducer from "~/nn/model/reducer";
import TabView from "../tab-view";
import Welcome from "./welcome";
import { readonlyFind } from "~/utils/type-modifiers";
import { ElementOf } from "~/utils/types";
import Model from "./model";
import Data from "./data";
import Gym from "./gym";

type TabTemplate = {
  name: string,
  closeable: boolean,
  component: Tab["component"],
  showToNewUsers: boolean,
  showToReturningUsers: boolean,
};
const TABS = [
  {
    name: "welcome",
    closeable: true,
    component: Welcome,
    showToNewUsers: true,
    showToReturningUsers: false,
  },
  {
    name: "model",
    closeable: false,
    component: Model,
    showToNewUsers: false,
    showToReturningUsers: true,
  },
  {
    name: "data",
    closeable: false,
    component: Data,
    showToNewUsers: false,
    showToReturningUsers: true,
  },
  {
    name: "gym",
    closeable: false,
    component: Gym,
    showToNewUsers: false,
    showToReturningUsers: true,
  },
] as const satisfies ReadonlyArray<TabTemplate>;
// const TAB_NAMES = ["welcome", "model", "data", "gym"] as const;
type TabName = typeof TABS[number]["name"];
type TabConst = ElementOf<typeof TABS>;
function tabByName<const N extends TabName>(name: N) {
  type FilteredEntry = Extract<TabConst, {name: N}>;
  function filterFunc(entry: TabConst): entry is FilteredEntry {
    return entry.name === name;
  }
  return readonlyFind(TABS, filterFunc)!;
}
const WelcomeTab = tabByName("welcome");
const ModelTab = tabByName("model");
const DataTab = tabByName("data");
const GymTab = tabByName("gym");

interface NNVisTab extends Tab {
}

function newTabs(usedVisualizerBefore: boolean) {
  return TABS.map((tab: TabConst): NNVisTab => {
    return {
      name: tab.name,
      closeable: tab.closeable,
      component: tab.component,
      visible: true,//usedVisualizerBefore ? tab.showToReturningUsers : tab.showToNewUsers,
    }
  });
}

export default function NNVisualizer() {
  // const [usedVisualizerBefore, setUsedVisualizerBefore] = useLocalStorage<boolean>("usedVisualizerBefore", false);
  // useEffect(() => {
  //   setUsedVisualizerBefore(true);
  // }, []);
  const usedVisualizerBefore = false;

  const [availableTabs, setAvailableTabs] = useState<NNVisTab[]>(newTabs(usedVisualizerBefore));
  const [currentTab, setCurrentTab] = useState<NNVisTab>(availableTabs[0]!);

  const closeTab = useCallback((tab: Closeable<NNVisTab>|TabName) => {
    // console.log(`closing tab ${tab.name} -- current=${currentTab.name}`)
    const tabNameToClose = typeof tab === "string" ? tab : tab.name;
    setAvailableTabs(available => {
      const filtered = available.filter(t => {
        return t.name !== tabNameToClose;
      });
      if (currentTab.name === tabNameToClose) {
        // console.log("current tab closed");
        setCurrentTab(filtered[0]!);
      }
      return filtered;
    });
  }, [currentTab]);

  const [model, updateModel] = useModelReducer();


  return (<>
    <TabView<Tab> availableTabs={availableTabs} currentTab={currentTab} switchTab={setCurrentTab} closeTab={closeTab}>
        <WelcomeTab.component close={() => closeTab(WelcomeTab.name)} />
        <ModelTab.component model={model} updateModel={updateModel} />
        <DataTab.component data="the data!"/>
        <GymTab.component />
    </TabView>
  </>)
}