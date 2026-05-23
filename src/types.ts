export interface IAbortSignal {
    readonly aborted: boolean;
    addEventListener(
        type: "abort",
        listener: (this: AbortSignal) => void,
    ): void;
    removeEventListener(
        type: "abort",
        listener: (this: AbortSignal) => void,
    ): void;
}
export interface FetchOptions {
    callSite: string;
    headers?: {
        [name: string]: string;
    };
    body?: BodyInit;
    timeout?: number;
    // biome-ignore lint/suspicious/noExplicitAny: same as definitions
    json?: any;
    method?: "GET" | "POST" | "PUT";
    signal?: IAbortSignal;
    suppressIntegrationId?: boolean;
}
export interface PaginationOptions<T> extends FetchOptions {
    pageSize?: number;
    startPage?: number;
    // biome-ignore lint/suspicious/noExplicitAny: same as definitions
    getItemsFromResponse: (data: any) => T[];
    buildUrl: (baseUrl: string, pageSize: number, page: number) => string;
}
export type MakeRequestOptions = Omit<FetchOptions, "callSite"> & {
    callSite?: string;
};
export interface WebSocketConnectOptions {
    headers?: {
        [name: string]: string;
    };
    suppressIntegrationId?: boolean;
}
export interface IFetcherService {
    // biome-ignore lint/suspicious/noExplicitAny: same as definitions
    fetch(url: string, options: FetchOptions): Promise<any>;
    fetchWithPagination<T>(
        baseUrl: string,
        options: PaginationOptions<T>,
    ): Promise<T[]>;
    // biome-ignore lint/suspicious/noExplicitAny: same as definitions
    createWebSocket(url: string, options?: WebSocketConnectOptions): any;
}
export interface IExtensionInformation {
    name: string;
    sessionId: string;
    machineId: string;
    deviceId: string;
    vscodeVersion: string;
    version: string;
    buildType: "dev" | "prod";
}
export interface CopilotToken {
    endpoints: {
        api?: string;
        telemetry?: string;
        proxy?: string;
        "origin-tracker"?: string;
    };
    sku: string;
}
export interface RemoteAgentJobPayload {
    problem_statement: string;
    event_type: string;
    event_content: string;
    pull_request?: {
        title?: string;
        body_placeholder?: string;
        body_suffix?: string;
        base_ref?: string;
        head_ref?: string;
    };
    run_name?: string;
    custom_agent?: string;
    agent_id?: number;
    model?: string;
}
export enum RequestType {
    CopilotToken = "CopilotToken",
    CopilotNLToken = "CopilotNLToken",
    ChatCompletions = "ChatCompletions",
    ChatResponses = "ChatResponses",
    ChatMessages = "ChatMessages",
    ProxyCompletions = "ProxyCompletions",
    ProxyChatCompletions = "ProxyChatCompletions",
    RemoteAgent = "RemoteAgent",
    RemoteAgentChat = "RemoteAgentChat",
    CodeReviewAgent = "CodeReviewAgent",
    CAPIEmbeddings = "CAPIEmbeddings",
    DotcomEmbeddings = "DotcomEmbeddings",
    EmbeddingsModels = "EmbeddingsModels",
    Models = "Models",
    AutoModels = "AutoModels",
    Chunks = "Chunks",
    EmbeddingsCodeSearch = "EmbeddingsCodeSearch",
    ListSkills = "ListSkills",
    SearchSkill = "SearchSkill",
    ContentExclusion = "ContentExclusion",
    Telemetry = "Telemetry",
    CopilotUserInfo = "CopilotUserInfo",
    ModelPolicy = "ModelPolicy",
    ListModel = "ListModel",
    SnippyMatch = "SnippyMatch",
    SnippyFilesForMatch = "SnippyFlesForMatch",
    CodingGuidelines = "CodingGuidelines",
    EmbeddingsIndex = "EmbedingsIndex",
    ChatAttachmentUpload = "ChatAttachmentUpload",
    CopilotSessionLogs = "CopilotSessionLogs",
    CopilotSessionDetails = "CopilotSessionDetails",
    CopilotSessions = "CopilotSessions",
    CopilotAgentJob = "CopilotAgentJob",
    CCAModelsList = "CCAModelsList",
    CopilotCustomAgents = "CopilotCustomAgents",
    CopilotCustomAgentsDetail = "CopilotCustomAgentsDetail",
    OrgCustomInstructions = "OrgCustomInstructions",
    CopilotAgentMemory = "CopilotAgentMemory",
    CopilotAgentJobEnabled = "CopilotAgentJobEnabled",
    AgentTask = "AgentTask",
    ModelRouter = "ModelRouter",
}
export type RequestMetadata =
    | {
          type: Exclude<
              RequestType,
              | RequestType.ListModel
              | RequestType.ModelPolicy
              | RequestType.SearchSkill
              | RequestType.RemoteAgentChat
              | RequestType.ContentExclusion
              | RequestType.ChatCompletions
              | RequestType.ChatResponses
              | RequestType.ChatMessages
              | RequestType.Models
              | RequestType.CodingGuidelines
              | RequestType.EmbeddingsIndex
              | RequestType.ChatAttachmentUpload
              | RequestType.CopilotSessionLogs
              | RequestType.CopilotSessionDetails
              | RequestType.CopilotSessions
              | RequestType.CopilotAgentJob
              | RequestType.CCAModelsList
              | RequestType.CopilotCustomAgents
              | RequestType.CopilotCustomAgentsDetail
              | RequestType.OrgCustomInstructions
              | RequestType.CopilotAgentMemory
              | RequestType.CopilotAgentJobEnabled
          >;
      }
    | {
          type: RequestType.CodingGuidelines | RequestType.EmbeddingsIndex;
          repoWithOwner: string;
      }
    | {
          type:
              | RequestType.ChatCompletions
              | RequestType.ChatResponses
              | RequestType.ChatMessages
              | RequestType.Models;
          isModelLab?: boolean;
      }
    | {
          type: RequestType.ListModel | RequestType.ModelPolicy;
          modelId: string;
          isModelLab?: boolean;
      }
    | {
          type: RequestType.SearchSkill;
          slug: string;
      }
    | {
          type: RequestType.RemoteAgentChat;
          slug?: string;
      }
    | {
          type: RequestType.ContentExclusion;
          repos: string[];
      }
    | {
          type: RequestType.ChatAttachmentUpload;
          uploadName: string;
          mimeType: string;
      }
    | {
          type:
              | RequestType.CopilotSessionLogs
              | RequestType.CopilotSessionDetails;
          sessionId: string;
      }
    | {
          type: RequestType.CopilotSessions;
          prId?: string;
          nwo?: string;
          resourceState?: string;
      }
    | {
          type: RequestType.CopilotAgentJob;
          owner: string;
          repo: string;
          payload?: RemoteAgentJobPayload;
          jobId?: string;
          sessionId?: string;
          apiVersion?: string;
      }
    | {
          type: RequestType.CCAModelsList;
      }
    | {
          type: RequestType.CopilotCustomAgents;
          owner: string;
          repo: string;
          target?: "github-copilot" | "vscode";
          exclude_invalid_config?: boolean;
          dedupe?: boolean;
          include_sources?: Array<"repo" | "org" | "enterprise">;
      }
    | {
          type: RequestType.CopilotCustomAgentsDetail;
          owner: string;
          repo: string;
          customAgentName: string;
          version?: string;
      }
    | {
          type: RequestType.OrgCustomInstructions;
          orgLogin: string;
      }
    | {
          type: RequestType.CopilotAgentMemory;
          repo: string;
          action?: "search" | "recent" | "enabled";
          limit?: number;
      }
    | {
          type: RequestType.CopilotAgentJobEnabled;
          owner: string;
          repo: string;
      }
    | {
          type: RequestType.AgentTask;
          action: AgentTaskAction;
          owner?: string;
          repo?: string;
          taskId?: string;
          searchParams?: Record<string, string | number | boolean>;
      };
export interface IDomainChangeResponse {
    capiUrlChanged: boolean;
    telemetryUrlChanged: boolean;
    dotcomUrlChanged: boolean;
    proxyUrlChanged: boolean;
}
interface CCAModelBilling {
    is_premium: boolean;
    multiplier: number;
    restricted_to: string[];
}
interface CCAModelVisionLimits {
    max_prompt_image_size: number;
    max_prompt_images: number;
    supported_media_types: string[];
}
interface CCAModelLimits {
    max_context_window_tokens: number;
    max_output_tokens: number;
    max_prompt_tokens: number;
    vision?: CCAModelVisionLimits;
}
interface CCAModelSupports {
    max_thinking_budget?: number;
    min_thinking_budget?: number;
    parallel_tool_calls: boolean;
    streaming: boolean;
    tool_calls: boolean;
    vision: boolean;
}
interface CCAModelCapabilities {
    family: string;
    limits: CCAModelLimits;
    object: string;
    supports: CCAModelSupports;
    tokenizer: string;
    type: string;
}
interface CCAModelPolicy {
    state: string;
    terms: string;
}
export interface CCAModel {
    billing: CCAModelBilling;
    capabilities: CCAModelCapabilities;
    id: string;
    is_chat_default: boolean;
    is_chat_fallback: boolean;
    model_picker_category: string;
    model_picker_enabled: boolean;
    name: string;
    object: string;
    policy: CCAModelPolicy;
    preview: boolean;
    supported_endpoints: string[];
    vendor: string;
    version: string;
}
/**
 * Discriminator selecting which Task API endpoint to call. Maps to operation IDs in the
 * Mission Control OpenAPI spec (`copilot-mission-control/api/generated-sessions-openapi.yaml`).
 */
export type AgentTaskAction =
    | "create"
    | "list"
    | "list-for-repo"
    | "get"
    | "events"
    | "steer"
    | "create-pr"
    | "archive"
    | "unarchive";
/** Lifecycle state of a Task (spec: `TaskState`). */
export type AgentTaskState =
    | "queued"
    | "in_progress"
    | "idle"
    | "waiting_for_user"
    | "completed"
    | "failed"
    | "timed_out"
    | "cancelled";
/** Spec: `User` schema. */
export interface AgentTaskUser {
    readonly id?: number;
    readonly login?: string;
    readonly node_id?: string;
    readonly url?: string;
}
/** Spec: `Repository` schema — currently only exposes `id`. */
export interface AgentTaskRepository {
    readonly id?: number;
}
/** Spec: `GitHubResource` schema (used when `TaskArtifact.type === "pull"`). */
export interface AgentTaskGitHubResourceData {
    /** Database id of the GitHub resource (e.g. internal PR id; NOT the user-facing PR number). */
    readonly id: number;
    readonly type?: string;
    /** GraphQL global ID. */
    readonly global_id?: string;
    readonly state?: "open" | "draft" | "closed" | "merged";
}
/** Spec: `BranchResource` schema (used when `TaskArtifact.type === "branch"`). */
export interface AgentTaskBranchResourceData {
    readonly head_ref: string;
    readonly base_ref: string;
}
/** Spec: `TaskArtifact`. */
export interface AgentTaskArtifact {
    readonly provider: "github" | string;
    readonly type: "pull" | "branch" | string;
    readonly data:
        | AgentTaskGitHubResourceData
        | AgentTaskBranchResourceData
        | Record<string, unknown>;
}
/** Spec: `Task`. `owner` and `repository` are siblings — `repository` carries only `id`. */
export interface AgentTask {
    readonly id: string;
    readonly url?: string;
    readonly html_url?: string;
    readonly name?: string;
    readonly creator?: AgentTaskUser;
    readonly creator_type?: "user" | "organization";
    readonly owner?: AgentTaskUser;
    readonly repository?: AgentTaskRepository;
    readonly state: AgentTaskState;
    readonly remote_steerable?: boolean;
    readonly session_count?: number;
    readonly artifacts?: readonly AgentTaskArtifact[];
    readonly archived_at?: string | null;
    readonly created_at: string;
    readonly updated_at?: string;
}
/** Spec: `Session` (members of `GetTaskResponse.sessions`). */
export interface AgentTaskSession {
    readonly id: string;
    readonly name?: string;
    readonly user?: AgentTaskUser;
    readonly owner?: AgentTaskUser;
    readonly repository?: AgentTaskRepository;
    readonly task_id?: string;
    readonly state: AgentTaskState;
    readonly created_at: string;
    readonly updated_at?: string;
    readonly completed_at?: string;
    readonly prompt?: string;
    readonly head_ref?: string;
    readonly base_ref?: string;
    readonly model?: string;
}
/** Spec: `GetTaskResponse` (Task + sessions). */
export interface AgentTaskGetResponse extends AgentTask {
    readonly sessions?: readonly AgentTaskSession[];
}
/** Spec: `ListTasksResponse`. */
export interface AgentTaskListResponse {
    readonly tasks: readonly AgentTask[];
    readonly total_active_count?: number;
    readonly total_archived_count?: number;
}
/** Spec: `CreateTaskRequest`. */
export interface AgentTaskCreateRequest {
    readonly prompt: string;
    readonly agent_id?: number;
    readonly repositories?: readonly {
        owner: string;
        name: string;
    }[];
    readonly problem_statement?: string;
    readonly event_content?: string;
    readonly model?: string;
    readonly custom_agent?: string;
    readonly create_pull_request?: boolean;
    readonly base_ref?: string;
    readonly head_ref?: string;
    readonly event_type?: string;
}
/** Spec: `SteerTaskRequest`. */
export interface AgentTaskSteerRequest {
    readonly content: string;
    readonly type?:
        | "user_message"
        | "ask_user_response"
        | "plan_approval_response"
        | "permission_response"
        | "elicitation_response"
        | "abort"
        | "mode_switch";
    readonly problem_statement?: string;
    readonly model?: string;
    readonly event_type?: string;
}
/** Subset of spec's `SessionEventType` enum that consumers typically read. */
export type AgentTaskSessionEventType =
    | "session.start"
    | "user.message"
    | "assistant.message"
    | "assistant.turn_start"
    | "assistant.turn_end"
    | "tool.execution_start"
    | "tool.execution_complete"
    | string;
/** Spec: `BaseSessionEvent` + event-type-specific `data` payload. */
export interface AgentTaskSessionEvent {
    readonly id: string;
    readonly timestamp: string;
    readonly parentId: string | null;
    readonly type: AgentTaskSessionEventType;
    readonly ephemeral?: boolean;
    readonly pending?: boolean;
    readonly dismissed?: boolean;
    readonly data?: Record<string, unknown>;
}
/** Spec: `ListTaskEventsResponse`. */
export interface AgentTaskListEventsResponse {
    readonly events: readonly AgentTaskSessionEvent[];
    readonly total: number;
}
/** Spec: `CreatePullRequestResponse`. */
export interface AgentTaskCreatePullRequestResponse {
    readonly id: number;
    readonly number: number;
    readonly repository_id: number;
}
