
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, User2, Zap, Clock3, Settings, Users, User, UserPlus } from "lucide-react-native";
import Button from "../components/Button";

export default function Profile() {
  const router = useRouter();

  const menuItems = [
    { icon: <User size={26} color="white" />, label: "Profile",  route: "/Referrals" },
    { icon: <Zap size={26} color="white" />, label: "What's New", route:"/New" },
    { icon: <Clock3 size={26} color="white" />, label: "Listening History", route: "/ListeningHistory" },
    {
      icon: <UserPlus size={26} color="white" />, label: "Invite Friends",
      otherItem: "20",
      image: <Image className="w-4 h-4 rounded-full" source={require("@/assets/images/ArtisteRadarLogo.png")} />,
      route: "/Referrals"
    },
    { icon: <Settings size={26} color="white" />, label: "Settings" },
  ];

  return (
    <ScrollView className="flex-1 bg-primary px-6 pt-14">
      <View className="flex-row justify-between items-center mb-6 ">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.push("/Menu")}>
            <Image
              className="w-12 h-12 rounded-full"
              source={require("@/assets/images/avatars/avatar1.png")}
            />
          </TouchableOpacity>

          <View className="">
            <Text className="text-white text-lg font-semibold">
              Tobi Ade-Ajayi
            </Text>
            <Text className="text-gray-400">@_tobiajayi</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/Registration/GetStarted")}
          className="flex-row  gap-3 items-center space-x-2 bg-accent px-6 py-4 rounded-3xl"
        >
          <Image
            source={require("@/assets/images/ArtisteRadarLogo.png")}
            className="w-5 h-5"
          />
          <Text className="text-white font-semibold">5000.00</Text>
        </TouchableOpacity>
      </View>
 
      <View className=" w-full border-b border-accent"></View>
  
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => item.route && router.push(item.route)}
          className="flex-row items-center justify-between mt-8 "
        >
          <View className="flex-row items-center size-8 w-full ">
            {item.icon}
            <Text className="text-white text-base font-bold pl-6">{item.label} </Text>
              {item.otherItem && item.image && (
              <View className="flex-row bg-secondary/20 rounded-xl p-3 ml-4">
              {item.image}
               <Text className="text-secondary text-base font-bold pl-2">{item.otherItem}</Text>
                </View>
               )}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
