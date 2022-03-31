import { gql } from "@apollo/client";

export const GET_CHALLENGES = gql`
  query GetChallenges {
    challenges(order_by: { created_at: desc }) {
      id
      icon
      frequency
      title
      created_at
      description
      total_entries
      entries_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const GET_CHALLENGE_BY_ID = gql`
  query GetChallengeById($id: uuid!) {
    challenges_by_pk(id: $id) {
      created_at
      description
      frequency
      icon
      id
      title
      total_entries
      entries_aggregate {
        aggregate {
          count
        }
      }
      entries(order_by: { created_at: desc }) {
        message
        id
        created_at
        nth
        challenge_id
      }
    }
  }
`;

export const CREATE_CHALLENGE = gql`
  mutation CreateChallenge(
    $title: String!
    $description: String!
    $icon: String!
    $frequency: String!
    $total_entries: Int!
  ) {
    insert_challenges_one(
      object: {
        title: $title
        description: $description
        icon: $icon
        frequency: $frequency
        total_entries: $total_entries
      }
    ) {
      id
      title
    }
  }
`;

export const CREATE_CHALLENGE_ENTRY = gql`
  mutation CreateChallengeEntry(
    $message: String!
    $nth: Int!
    $challenge_id: uuid!
  ) {
    insert_entries_one(
      object: { message: $message, nth: $nth, challenge_id: $challenge_id }
    ) {
      id
    }
  }
`;

export const DELETE_CHALLENGE = gql`
  mutation DeleteChallenge($id: uuid!) {
    delete_challenges_by_pk(id: $id) {
      id
    }
  }
`;

export const DELETE_PROFILE = gql`
  mutation DeleteProfile($id: uuid!) {
    delete_profiles_by_pk(id: $id) {
      id
    }
  }
`;
