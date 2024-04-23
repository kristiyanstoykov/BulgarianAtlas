import React from "react";
import { Text, Button } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { FONT, SIZES } from "../../../constants";

export default function Details() {
  const { authState } = useAuth();

  return (
    <>
      <Text style={{ fontFamily: FONT.regular, fontSize: SIZES.large }}>
        Име: {authState.userFirstName}
      </Text>
      <Text style={{ fontFamily: FONT.regular, fontSize: SIZES.large }}>
        Фамилия: {authState.userLastName}
      </Text>
      <Text style={{ fontFamily: FONT.regular, fontSize: SIZES.large }}>
        Имейл: {authState.userEmail}
      </Text>
    </>
  );
}
