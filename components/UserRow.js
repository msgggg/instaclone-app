import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native"
import React from "react";
import styled from "styled-components/native";
import { UserAvatar, UserInfoBox, Username } from "./sharedStyles";

const FOLLOW_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
      error
    }
  }
`;

const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
      error
    }
  }
`;

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
`;

const FollowBtn = styled.TouchableOpacity`
	border: none;
	background-color: #0095f6;
	border-radius: 3px;
	padding: 5px 16px;
	justify-content: center;
	align-items: center;
`;

const FollowText = styled.Text`
	color: white;
	text-align: center;
	font-weight: 600;
`;

export default function UserRow({ username, avatar, isFollowing, isMe }) {
  const navigation = useNavigation();
  const followOnCompleted = (data) => {
    const {
      followUser: { ok },
    } = data;
    if (!ok) {
      return;
    }
  };

  const unfollowOnCompleted = (data) => {
    const {
      data: {
        unfollowUser: { ok },
      },
    } = result;
    if (!ok) {
      return;
    }
  };

  const toggleUpdate = (cache, result) => {
    console.log(result);
    const userId = `User:${id}`;
    cache.modify({
      id: userId,
      fields: {
        isFollowing(prev) {
          return !prev;
        },
      },
    });
  };

  const [followMutation, { loading: followLoading }] = useMutation(
    FOLLOW_USER_MUTATION,
    { onCompleted: followOnCompleted, update: toggleUpdate }
  );
  const [unfollowMutation, { loading: unfollowLoading }] = useMutation(
    UNFOLLOW_USER_MUTATION,
    { onCompleted: unfollowOnCompleted, update: toggleUpdate }
  );

  const followOnValid = () => {
    if (!followLoading) {
      followMutation({ variables: { username } });
    }
  };
  const unfollowOnValid = () => {
    if (!unfollowLoading) {
      unfollowMutation({ variables: { username } });
    }
  };
  return (
    <Wrapper>
      <UserInfoBox onPress={() => navigation.navigate("Profile")}>
        <UserAvatar
          resizeMode="cover"
          source={{ uri: avatar }} />
        <Username>{username}</Username>
      </UserInfoBox>
      {isMe ? null : (
        <FollowBtn
          onPress={
            isFollowing ? () => unfollowOnValid() : () => followOnValid()
          }
        >
          <FollowText>{isFollowing ? "Unfollow" : "Follow"}</FollowText>
        </FollowBtn>
      )}
    </Wrapper>
  );
};