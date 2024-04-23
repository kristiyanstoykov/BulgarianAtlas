import { Stack } from "expo-router";

import { Login, ScreenHeaderBtn, Sites } from "../components";
import { COLORS, FONT, SIZES, icons, images } from "../constants";

export default function Home() {
  return (
    <Login />
    // <SafeAreaView>
    //   <ScrollView showsHorizontalScrollIndicator={true}>
    //     <View style={styles.container}>
    //       <Text style={styles.header}>Bulgarian culture</Text>
    //       <Sites />
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
  );
}
