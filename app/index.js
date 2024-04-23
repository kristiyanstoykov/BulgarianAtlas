import { Stack } from "expo-router";
import { ScreenHeaderBtn, Sites } from "../components";
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    overflow: "hidden",
  },
  header: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.bold,
  },
  error: {
    color: "red",
  },
});
