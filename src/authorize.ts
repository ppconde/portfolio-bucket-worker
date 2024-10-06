const ALLOW_LIST = [".glb", ".jpg", ".jpeg", ".png", ".gltf", ".bin"];

// Check requests for a pre-shared secret
const hasValidHeader = (request: Request, env: Env): boolean => {
    return request.headers.get("X-Custom-Auth-Key") === env.AUTH_KEY_SECRET;
};

export function authorizeRequest(request: Request, env: Env, key: string): boolean {
    switch (request.method) {
        case "PUT":
        case "DELETE":
            return hasValidHeader(request, env);
        case "GET":
            return ALLOW_LIST.some((ext) => new RegExp(`${ext}\/?`, 'i').test(key));
        default:
            return false;
    }
}
