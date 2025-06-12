import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import icons from '@/constants/icons';

const TabIcons = ({ focused, title, icon }: any) => {
  if (focused) {
    return (
      <ImageBackground className="flex w-full flex-1 min-w-[112px] min-h-14 mt-5 justify-center items-center overflow-hidden ">
        <Image
          source={icon}
          style={{
            tintColor: focused ? "#fff" : "#888",
          }}
          resizeMode="contain"
        />
        <Text className="text-icongray text-base font-semibold mt-2">
          {title}
        </Text>
      </ImageBackground>
    );
  } else {
    return (
      <View className="mt-5 justify-center items-center min-h-14 min-w-[112px]">
        <Image
          source={icon}
          style={{
            tintColor: focused ? "#fff" : "#888",
          }}
          resizeMode="contain"
        />
        <Text className="text-icongray text-base font-semibold mt-2">
          {title}
        </Text>
      </View>
    );
  }
}

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 40,
          left: 20,
          right: 20,
          height: 70,
          width: "100%",
          borderRadius: 20,
          backgroundColor: "#000",
          shadowRadius : 10,
          // shadowColor: "red",

        },
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        // tabBarActiveTintColor: "#fff",
        // tabBarInactiveTintColor: "#888",
        // headerShown: false,
      } }
    
    >
      <Tabs.Screen
        name="Index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcons
              focused={focused}
              title="Home"
              icon={icons.homeicon}
            />
          )
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
            <TabIcons
              focused={focused}
              title="Rank"
              icon={icons.rankicon}   
            />
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
              icon={icons.activityicons}
            />  
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({})