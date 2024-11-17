export const expandMenuOpen = (isCollapsed: boolean, setCollapsed: (value: boolean) => void) => {
  if (!isCollapsed) {
    // If the sidebar is not collapsed, remove the mini-sidebar class
    return document.body.classList.remove('mini-sidebar');
  }

  // Otherwise, set collapsed to false and apply expanded menu state
  setCollapsed(false);
  // Set 'collapsed' in local storage
  localStorage.removeItem('collapsed');
  document.body.classList.add('expand-menu');
};

export const expandMenuClose = (isCollapsed: boolean, setCollapsed: (value: boolean) => void) => {
  if (isCollapsed) {
    // If the sidebar is collapsed, apply the mini-sidebar class
    return document.body.classList.add('mini-sidebar');
  }

  // Otherwise, remove collapsed state and expand the menu
  setCollapsed(false);
  // Remove 'collapsed' from local storage
  localStorage.setItem('collapsed', String(isCollapsed));
  document.body.classList.remove('expand-menu');
};
