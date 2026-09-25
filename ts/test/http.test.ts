import { describe, expect, it } from 'vitest';
import {
  AdminService, ChannelService, ErrorCode, httpStatusOf, MembershipService, rpcPath, ServerInfoService, WebSocketService,
} from '../src/index.js';

describe('HTTP binding', () => {
  it('builds the path of every unary method from the schema', () => {
    expect(rpcPath(ChannelService.method.send)).toBe('/collab.v1.ChannelService/Send');
    expect(rpcPath(MembershipService.method.join)).toBe('/collab.v1.MembershipService/Join');
    expect(rpcPath(AdminService.method.createInvite)).toBe('/collab.v1.AdminService/CreateInvite');
    expect(rpcPath(ServerInfoService.method.getServerInfo)).toBe('/collab.v1.ServerInfoService/GetServerInfo');
    expect(rpcPath(WebSocketService.method.issueTicket)).toBe('/collab.v1.WebSocketService/IssueTicket');
  });

  it('gives every error code a status', () => {
    const codes = Object.values(ErrorCode).filter((value): value is ErrorCode => typeof value === 'number');
    for (const code of codes) expect([400, 401, 403, 404, 409, 426, 500]).toContain(httpStatusOf(code));
    expect(httpStatusOf(ErrorCode.UNAUTHENTICATED)).toBe(401);
    expect(httpStatusOf(ErrorCode.NAME_TAKEN)).toBe(409);
    expect(httpStatusOf(ErrorCode.MESSAGE_TOO_LONG)).toBe(400);
  });
});
