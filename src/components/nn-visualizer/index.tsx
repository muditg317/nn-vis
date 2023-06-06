import { useCallback, useState } from "react";
import TabView, {type Closeable, type Tab} from "~/components/tab-view";
import useModelReducer from "~/nn/model/reducer";
import Welcome from "./welcome";
import { readonlyFind } from "~/utils/type-modifiers";
import type { ArrayOf, ElementOf } from "~/utils/types";
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
// const TAB_NAMES = ["welcome", &ldquo;model&rdquo; , "data", "gym"] as const;
type TabName = typeof TABS[number]["name"];
type TabConst = ElementOf<typeof TABS>;
function tabByName<const N extends TabName>(name: N) {
  type FilteredEntry = Extract<TabConst, {name: N}>;
  function filterFunc(entry: TabConst): entry is FilteredEntry {
    return entry.name === name;
  }
  return readonlyFind(TABS, filterFunc);
}
const WelcomeTab = tabByName("welcome");
const ModelTab = tabByName("model");
const DataTab = tabByName("data");
const GymTab = tabByName("gym");

type NNVisTab = Tab;

function newTabs(_usedVisualizerBefore: boolean) {
  const tabs = TABS.map((tab: TabConst): NNVisTab => {
    return {
      name: tab.name,
      closeable: tab.closeable,
      component: tab.component,
      visible: true,//usedVisualizerBefore ? tab.showToReturningUsers : tab.showToNewUsers,
    }
  });
  return tabs as ArrayOf<'exactly', typeof TABS["length"], ElementOf<typeof tabs>>;
}

export default function NNVisualizer() {
  // const [usedVisualizerBefore, setUsedVisualizerBefore] = useLocalStorage<boolean>("usedVisualizerBefore", false);
  // useEffect(() => {
  //   setUsedVisualizerBefore(true);
  // }, []);
  const usedVisualizerBefore = false;

  const [availableTabs, setAvailableTabs] = useState<ArrayOf<'at least', 1, NNVisTab>>(newTabs(usedVisualizerBefore));
  const [currentTab, setCurrentTab] = useState<NNVisTab>(availableTabs[0]);

  const closeTab = useCallback((tab: Closeable<NNVisTab>|TabName) => {
    // console.log(`closing tab ${tab.name} -- current=${currentTab.name}`)
    const tabNameToClose = typeof tab === "string" ? tab : tab.name;
    setAvailableTabs(available => {
      const filtered = available.filter(t => {
        return t.name !== tabNameToClose;
      });
      if (filtered.length === 0) {
        // console.log("no tabs left");
        return available;
      }
      const newTabs = filtered as ArrayOf<'at least', 1, NNVisTab>; 
      if (currentTab.name === tabNameToClose) {
        // console.log("current tab closed");
        setCurrentTab(newTabs[0]);
      }
      return newTabs;
    });
  }, [currentTab]);

  const [model, updateModel] = useModelReducer();


  return (<>
    <TabView<Tab> availableTabs={availableTabs} currentTab={currentTab} switchTab={setCurrentTab} closeTab={closeTab}>
        <WelcomeTab.component close={() => closeTab(WelcomeTab.name)} />
        <ModelTab.component model={model} updateModel={updateModel} />
        <DataTab.component data="the data!"/>
        <GymTab.component model={model} />
    </TabView>
  </>)
}