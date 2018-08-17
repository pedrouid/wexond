import store from 'app-store';

interface Commands {
  [key: string]: () => void;
}

export const commands: Commands = {
  'tabs.switch': (e?: KeyboardEvent) => {
    const { tabs } = store.tabGroupsStore.getCurrent();

    // 0
    if (e.keyCode === 48) {
      tabs[tabs.length - 1].select();
    } else {
      // 1-9
      const index = e.keyCode - 49;

      if (tabs.length > index) {
        tabs[index].select();
      }
    }
  },
  'tabs.new': () => {
    createTab();
  },
  'tabs.reload': () => {
    getSelectedPage().webview.reload();
  },
  'tabs.back': () => {
    getSelectedPage().webview.goBack();
  },
  'tabs.forward': () => {
    getSelectedPage().webview.goForward();
  },
  'tabs.home': () => {
    console.log('home');
  },
  'workspaces.show': () => {
    store.workspacesMenuVisible = true;
  },
  'history.show': () => {
    store.menu.visible = true;
    store.menu.selectedItem = 0;
  },
  'menu.show': () => {
    store.menu.visible = true;
  },
  'bookmarks.show': () => {
    store.menu.visible = true;
    store.menu.selectedItem = 1;
  },
  'wexond.hideAllMenu': () => {
    store.workspacesMenuVisible = false;
    store.menu.visible = false;
    store.menu.selectedItem = null;
    store.bookmarkDialogVisible = false;
    store.pageMenuVisible = false;
  },
};