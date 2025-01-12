/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
// @ts-nocheck
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Account = {
  __typename?: 'Account';
  address: Address;
};

export type Address = {
  __typename?: 'Address';
  frienlyFormat?: Maybe<Scalars['String']['output']>;
  rawFormat?: Maybe<Scalars['String']['output']>;
};

export type CursorPaginationInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: Scalars['Int']['input'];
};

export type NftItem = {
  __typename?: 'NftItem';
  address: Address;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<Account>;
  preview?: Maybe<Scalars['String']['output']>;
};


export type NftItemPreviewArgs = {
  resolution?: InputMaybe<Resolution>;
};

export type NftItemConnection = {
  __typename?: 'NftItemConnection';
  /** A list of edges. */
  edges: Array<NftItemEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type NftItemEdge = {
  __typename?: 'NftItemEdge';
  /** Description for the cursor. */
  cursor: Scalars['ID']['output'];
  /** Description for the NFT item. */
  nftItem: NftItem;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  /** The end cursor. */
  endCursor?: Maybe<Scalars['ID']['output']>;
  /** Whether there is a next page. */
  hasNextPage: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  me: User;
  nftItems: NftItemConnection;
};


export type QueryNftItemsArgs = {
  query: CursorPaginationInput;
};

export enum Resolution {
  X5 = 'X5',
  X100 = 'X100',
  X500 = 'X500',
  X1500 = 'X1500'
}

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['String']['output']>;
  random: Scalars['String']['output'];
};

export type NftItemFragmentFragment = { __typename?: 'NftItem', id: string, name?: string | null, description?: string | null, src?: string | null, address: { __typename?: 'Address', rawFormat?: string | null, frienlyFormat?: string | null }, owner?: { __typename?: 'Account', address: { __typename?: 'Address', frienlyFormat?: string | null } } | null };

export type NftItemsQueryVariables = Exact<{
  query: CursorPaginationInput;
}>;


export type NftItemsQuery = { __typename?: 'Query', nftItems: { __typename?: 'NftItemConnection', edges: Array<{ __typename?: 'NftItemEdge', cursor: string, nftItem: { __typename?: 'NftItem', id: string, name?: string | null, description?: string | null, src?: string | null, address: { __typename?: 'Address', rawFormat?: string | null, frienlyFormat?: string | null }, owner?: { __typename?: 'Account', address: { __typename?: 'Address', frienlyFormat?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } };

export const NftItemFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NftItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NftItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","alias":{"kind":"Name","value":"src"},"name":{"kind":"Name","value":"preview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resolution"},"value":{"kind":"EnumValue","value":"X500"}}]},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rawFormat"}},{"kind":"Field","name":{"kind":"Name","value":"frienlyFormat"}}]}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"frienlyFormat"}}]}}]}}]}}]} as unknown as DocumentNode<NftItemFragmentFragment, unknown>;
export const NftItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NftItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CursorPaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nftItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"nftItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NftItemFragment"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NftItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NftItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","alias":{"kind":"Name","value":"src"},"name":{"kind":"Name","value":"preview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resolution"},"value":{"kind":"EnumValue","value":"X500"}}]},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rawFormat"}},{"kind":"Field","name":{"kind":"Name","value":"frienlyFormat"}}]}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"frienlyFormat"}}]}}]}}]}}]} as unknown as DocumentNode<NftItemsQuery, NftItemsQueryVariables>;