import React, { type ReactElement } from "react";


export interface Tab {
  readonly name: string,
  readonly closeable: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>,
  visible: boolean,
}
export type Closeable<T extends Tab> = T & { readonly closeable: true };
function canClose<T extends Tab>(tab: Tab): tab is Closeable<T> {
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

function childForCurrentTab(children: React.ReactNode, currentTab: Tab) {
  const validChildren = getAllValidChildren(children);
  function isChildForCurrentTab(child: ReactElement) {
    return child.type === currentTab.component
        || (child.type instanceof Function && child.type.name === currentTab.component.name);
  }
  // console.log(...validChildren.map(c => [c.type, isChildForCurrentTab(c)]));
  const childToRender = validChildren.find(c => isChildForCurrentTab(c));// ?? validChildren[0] ?? <></>;
  // console.log(currentTab, childToRender);
  return childToRender;
}


interface TabComponentProps<T extends Tab> {
  availableTabs: Array<T>,
  currentTab: T,
  switchTab: (tab: T) => void,
  closeTab: (tab: Closeable<T>) => void,
}

interface TabViewProps<T extends Tab> extends TabComponentProps<T> {
  children: React.ReactNode,
}
export default function TabView<T extends Tab>({ availableTabs, currentTab, switchTab, closeTab, children }: TabViewProps<T>) {
  const childToRender = childForCurrentTab(children, currentTab);
  return (<>
    <TabBar<T> availableTabs={availableTabs} currentTab={currentTab} switchTab={switchTab} closeTab={closeTab} />
    <div className={`w-full h-full`}>
      {childToRender}
    </div>
  </>)
}

type TabBarProps<T extends Tab> = TabComponentProps<T>;

function TabBar<T extends Tab>({ availableTabs, currentTab, switchTab, closeTab }: TabBarProps<T>) {
  return (<>
    <nav className="flex flex-row items-center justify-start w-full h-10 bg-gray-200 border-b-2 border-purple-400">
      {availableTabs.filter(o => o.visible).map((option) => {
        const isActive = option == currentTab;
        return (<div key={option.name} className={`flex flex-row items-center justify-center w-24 h-full first:ml-1  rounded-t-lg ${isActive ? "bg-purple-400 z-10 text-white" : "hover:bg-purple-500/50 hover:z-10 text-purple-700 hover:text-white"}`} onClick={() => !isActive && switchTab(option)}>
          <p className="">{option.name}</p>
          {option.closeable &&
            <button className="w-4 h-4 ml-2 text-white" onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              return canClose(option) && closeTab(option);
            }}>x</button>
          }
        </div>)
      })}
    </nav>
  </>)
}