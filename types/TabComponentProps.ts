// TabComponentProps.ts

export interface Tab {
  id: string;
  title: string;
  content: JSX.Element;
}

export interface TabComponentProps {
  tabs: Tab[];
}
