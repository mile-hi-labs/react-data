export const showTabBar = navigation => {
  const parent = navigation.dangerouslyGetParent();
  parent.setOptions({tabBarVisible: true});
};

export const hideTabBar = navigation => {
  const parent = navigation.dangerouslyGetParent();
  parent.setOptions({tabBarVisible: false});
};
