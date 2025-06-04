export declare class CreateProjectInput {
    name: string;
    description?: string;
    status?: string;
}
declare const UpdateProjectInput_base: import("@nestjs/common").Type<Partial<CreateProjectInput>>;
export declare class UpdateProjectInput extends UpdateProjectInput_base {
}
export {};
