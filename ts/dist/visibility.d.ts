/**
 * Who may read a message: the one rule behind both the live fan-out and every
 * read of stored messages (the replay on `hello`, GetState, History), so the two
 * can never disagree. Servers must not reimplement it per path. Other languages
 * implement it against vectors/visibility.json.
 */
/** One client session, as far as deciding what it may read goes. */
export interface Viewer {
    /** The member the session belongs to. */
    memberId: string;
    topic: string;
    clientSessionId: string;
}
/**
 * The fields the rule reads. `fromClientSessionId` is the sending session, and
 * `to.clientSessionId` one session of `to.memberId`: session ids are only unique
 * within a member.
 */
export interface VisibilitySubject {
    fromMemberId: string;
    fromClientSessionId?: string;
    to?: {
        memberId?: string;
        topic?: string;
        clientSessionId?: string;
        includeSender?: boolean;
    };
}
/**
 * - `to.memberId` limits it to that member's sessions, `to.topic` to sessions in
 *   that topic; with both, both must match. A message with neither is read by nobody.
 * - `to.clientSessionId` limits it further to that one session of `to.memberId`.
 *   Without a member it names nobody.
 * - The session that sent it never gets it back.
 * - The sender's other sessions only get it when it names the sender as the
 *   member: a message to a topic is for the other people in it, so two sessions
 *   of the same developer do not interrupt each other with every `done`. Unless
 *   `to.includeSender`, which the server sets on its task notices: what one
 *   session did to a shared list, the developer's other sessions need to know.
 */
export declare function visibleTo(viewer: Viewer, message: VisibilitySubject): boolean;
