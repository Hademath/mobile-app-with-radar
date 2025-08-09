import { View, Text, TouchableOpacity, TextInput, ScrollView, } from "react-native";
import {  useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

export default function CreatePrompt() {
const router = useRouter();
const [prompts, setPrompts] = useState([]) as any;

const handleAddPrompt = () => {
setPrompts([...prompts, { question: "", options: [{ value: "" }] }]);
};

const handleAddOption = (promptIndex: number) => {
const newPrompts = [...prompts];
newPrompts[promptIndex].options.push({ value: "" });
setPrompts(newPrompts);
};

const handleRemoveOption = (promptIndex: number, optionIndex: any) => {
const newPrompts = [...prompts];
newPrompts[promptIndex].options.splice(optionIndex, 1);
setPrompts(newPrompts);
};

const handleOptionChange = (text: string, promptIndex: number, optionIndex: string | number) => {
const newPrompts = [...prompts];
newPrompts[promptIndex].options[optionIndex].value = text;
setPrompts(newPrompts);
};


const handleQuestionChange = (text: string, index: number) => {
const newPrompts = [...prompts];
newPrompts[index].question = text;
setPrompts(newPrompts);
};

const handleRemovePrompt = (index: number) => {
const newPrompts = [...prompts];
newPrompts.splice(index, 1);
setPrompts(newPrompts);
};

return (
<ScrollView className="flex-1 bg-primary px-5 pt-12">
    {/* Header */}
    <View className="flex-row justify-between items-center mb-6">
    <TouchableOpacity
        onPress={() => router.back()}
        className="w-10 h-10 rounded-full bg-white items-center justify-center mr-4"
    >
        <ArrowLeft size={20} color="black" />
    </TouchableOpacity>

    <TouchableOpacity onPress={() => router.push("/UnreleasedPreview")}>
        <Text className="text-teal-400 font-semibold text-lg">Continue</Text>
    </TouchableOpacity>
    </View>

    <View className="w-full border-b border-accent mb-8" />

    {/* Title */}
    <Text className="text-white font-bold text-3xl mb-2">Create Prompts</Text>
    <Text className="text-tertiary mb-6">You can create new prompts.</Text>

    <View className="flex-row justify-end mb-10">
    <TouchableOpacity
        className="flex-row gap-3 p-4 rounded-xl px-3 items-center bg-accent"
        onPress={handleAddPrompt}
    >
        <View className="bg-white rounded-3xl p-1">
        <MaterialCommunityIcons name="plus" size={24} color="black" />
        </View>
        <Text className="text-center text-2xl text-white font-semibold">
        New Prompts
        </Text>
    </TouchableOpacity>
    </View>

    {prompts.map((prompt:any, promptIndex:any) => (
    <View key={promptIndex}>
        <View className="bg-accent rounded-3xl p-5 gap-5 mb-6">
        <View className="flex-row justify-between items-center">
            <Text className="text-white font-bold text-lg">
            Prompt {promptIndex + 1}
            </Text>
            <TouchableOpacity onPress={() => handleRemovePrompt(promptIndex)}>
            <MaterialCommunityIcons name="close" size={24} color="white" />
            </TouchableOpacity>
        </View>
        <TextInput
            className="bg-primary text-white text-xl rounded-lg p-4 border-b-4 "
            style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 1,
            }}
            placeholder="Enter Your question"
            placeholderTextColor={"#5F6368"}
            value={prompt.question}
            onChangeText={(text) => handleQuestionChange(text, promptIndex)}
        />
        <Text className="text-white font-bold text-lg">
            Multiple Choice
        </Text>
        {prompt.options.map((option: { value: any; }, optionIndex: any) => (
            <View key={optionIndex} className="flex-row  items-center">
            <TextInput
                className="bg-primary rounded-tl-xl rounded-bl-xl text-white text-lg p-4 flex-1 border-b-4 "
                placeholder={`Option ${optionIndex + 1}`}
                placeholderTextColor={"#5F6368"}
                value={option.value}
                onChangeText={(text) =>
                handleOptionChange(text, promptIndex, optionIndex)
                }
            />
            {optionIndex >= 0 && (
                <TouchableOpacity
                className="bg-primary p-[12.5px] rounded-tr-xl rounded-br-xl border-b-4  "
                onPress={() => handleRemoveOption(promptIndex, optionIndex)}
                >
                <MaterialCommunityIcons
                    name="close"
                    size={23}
                    className="bg-[#5F6368] rounded-full"
                />
                </TouchableOpacity>
            )}
            </View>
        ))}
        <TouchableOpacity onPress={() => handleAddOption(promptIndex)}>
            <Text className="text-white/60 font-bold text-lg">
            Add option
            </Text>
        </TouchableOpacity>
        </View>
        {promptIndex === prompts.length - 1 && ( 
        <View className="flex-col justify-center items-center rounded-3xl h-30 border border-dashed border-accent mb-6"> 
            <TouchableOpacity 
            className="items-center justify-center py-8 text-white" 
            onPress={handleAddPrompt} 
            > 
            <View className="bg-white p-2 rounded-3xl mb-3"> 
                <MaterialCommunityIcons name="plus" size={24} color="black" /> 
            </View>
            <Text className="text-white/60 font-bold text-lg">
                Add New Prompts
            </Text> 
            </TouchableOpacity> 
        </View> 
        )}  
    </View> 
    ))} 
    {prompts.length === 0 && ( 
    <View className="flex-col justify-center items-center rounded-3xl h-96 border border-dashed border-accent"> 
        <TouchableOpacity 
        className="items-center justify-center py-8 text-white"
        onPress={handleAddPrompt}
        >
        <View className="bg-white p-2 rounded-3xl mb-3">
            <MaterialCommunityIcons name="plus" size={24} color="black" />
        </View>
        <Text className="text-white font-bold text-lg">
            Add New Prompts
        </Text>
        </TouchableOpacity>
    </View>
        )}
        

        <Text></Text>
        <Text></Text>
        <Text></Text>
</ScrollView>
);
}
