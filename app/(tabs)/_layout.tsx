import {Text, View,  TouchableOpacity } from 'react-native'
import React from 'react'
import {  router, Tabs } from 'expo-router'
import icons from '@/constants/icons';


const TabIcons = ({ focused, title, icon: IconComponent }: any) => {
  return (
    <View className="justify-center mt-8  items-center min-h-14 min-w-[70px]">
      <IconComponent
        width={24}
        height={24}
        color={focused ? "#ffffff" : "#5F6368"}
      />
      <Text
        className={`text-sm font-medium mt-1 ${
          focused ? "text-white" : "text-icongray"
        }`}
      >
        {title}
      </Text>
    </View>
  );
};



export default function _layout() {
  return (
    <>
      <TouchableOpacity
        className="absolute  z-10 bottom-28 right-6 w-16 h-16 bg-primary rounded-full items-center justify-center shadow-lg"
        onPress={() => router.push("/MusicType")}
      >
        <Text className="text-4xl text-secondary  -mt-1"> + </Text>
      </TouchableOpacity>
      <Tabs
        
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 10,
            left: 20,
            right: 20,
            height: 70,
            marginLeft:12,
            marginRight:12,
            borderRadius: 35,
            backgroundColor: "#121212",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 10, // for Android shadow
            borderTopWidth: 0,
          },
          tabBarItemStyle: {
            justifyContent: "center",
            alignItems: "center",
          },
          // tabBarActiveTintColor: "#fff",
          // tabBarInactiveTintColor: "#888",
        }}
      >
        <Tabs.Screen
          name="Index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcons focused={focused} title="Home" icon={icons.homeicon} />
            ),
          }}
        />
        <Tabs.Screen
          name="Browse"
          options={{
            title: "Browse",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcons
                focused={focused}
                title="Browse"
                icon={icons.browseicon}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Store"
          options={{
            title: "Store",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcons
                focused={focused}
                title="Store"
                icon={icons.storeicon}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Rank"
          options={{
            title: "Rank",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcons focused={focused} title="Rank" icon={icons.rankicon} />
            ),
          }}
        />

        <Tabs.Screen
          name="Activity"
          options={{
            title: "Activity",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcons
                focused={focused}
                title="Activity"
                icon={icons.activityIcon}
              />
            ),
          }}
        />
      </Tabs>
      {/* <View className="items-center bg-primary">
        <View className="w-[50%] items-center h-2 bg-white/50 rounded-full mb-2">
          <View className="h-full bg-white rounded-full w-[100%]" />
        </View>
      </View> */}
    </>
  );
}