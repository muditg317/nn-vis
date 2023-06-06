import React, { ReactElement } from "react";


export interface Tab {
  readonly name: string,
  readonly closeable: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>,
  visible: boolean,
}
export interface CloseableTab extends Tab { readonly closeable: true };
function canClose(tab: Tab): tab is CloseableTab {
  return tab.closeable;
}


function getAllValidChildren(children: React.ReactNode) {
  const validChildren: ReactElement[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      validChildren.push(child);
    }
  });

  return validChildren;
}

interface TabComponentProps<T extends Tab> {
  availableTabs: Array<T>,
  currentTab: T,
  switchTab: (tab: T) => void,
  closeTab: (tab: CloseableTab) => void,
}

interface TabViewProps<T extends Tab> extends TabComponentProps<T> {
  children: React.ReactNode,
}
export default function TabView<T extends Tab>({ availableTabs, currentTab, switchTab, closeTab, children }: TabViewProps<T>) {
  const validChildren = getAllValidChildren(children);
  console.log(...validChildren.map(c => [c.type, c.type === currentTab.component]));
  const childToRender = validChildren.find(c => c.type === currentTab.component);// ?? validChildren[0] ?? <></>;
  console.log(childToRender);
  return (<>
    <div className="flex flex-col items-center justify-center w-full h-full">
      <TabBar<T> availableTabs={availableTabs} currentTab={currentTab} switchTab={switchTab} closeTab={closeTab} />
      <div className={`flex flex-row items-center justify-center w-full h-full`}>
        {childToRender}
      </div>
    </div>
  </>)
}

interface TabBarProps<T extends Tab> extends TabComponentProps<T> {
}
function TabBar<T extends Tab>({ availableTabs, currentTab, switchTab, closeTab }: TabBarProps<T>) {
  return (<>
    <div className="flex flex-row items-center justify-center w-full h-12">
      {availableTabs.filter(o => o.visible).map((option, i) => {
        const isActive = option == currentTab;
        return (<div key={i} className={`flex flex-row items-center justify-center w-24 h-full ${isActive ? "bg-blue-500" : "bg-gray-500"} hover:bg-blue-500`} onClick={() => !isActive && switchTab(option)}>
          <p className="text-white">{option.name}</p>
          {option.closeable &&
            <button className="w-4 h-4 ml-2 text-white" onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              return canClose(option) && closeTab(option);
            }}>x</button>
          }
        </div>)
      })}
    </div>
  </>)
}