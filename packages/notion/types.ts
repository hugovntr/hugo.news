import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

type QueryResult = Extract<
    QueryDatabaseResponse["results"][number],
    { properties: Record<string, unknown> }
>;
type PropertyValueMap = QueryResult["properties"];
type PropertyValue = PropertyValueMap[string];
type PropertyValueType = PropertyValue["type"];
type ExtractedPropertyValue<T extends PropertyValueType> = Extract<
    PropertyValue,
    { type: T }
>;

export type NotionImageDatabaseItem = QueryResult & {
    properties: {
        Name: ExtractedPropertyValue<"title">;
        Image: ExtractedPropertyValue<"files">;
        Prompt: ExtractedPropertyValue<"rich_text">;
        PromptShare: ExtractedPropertyValue<"checkbox">;
        Collections: ExtractedPropertyValue<"relation">;
        CreatedAt: ExtractedPropertyValue<"created_time">;
    };
};

export type NotionImageCollectionDatabaseItem = QueryResult & {
    properties: {
        Name: ExtractedPropertyValue<"title">;
        Images: ExtractedPropertyValue<"relation">;
    };
};
