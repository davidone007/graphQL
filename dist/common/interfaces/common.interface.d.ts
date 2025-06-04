export interface JwtPayloadInterface {
    sub: string;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
}
export interface GraphQLContext {
    req: {
        user?: any;
        headers?: Record<string, string>;
    };
}
export interface PaginationArgs {
    skip?: number;
    take?: number;
}
export interface SortArgs {
    field?: string;
    direction?: 'ASC' | 'DESC';
}
