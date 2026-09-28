/**
 * Who may read a message: the one rule behind both the live fan-out and every
 * read of stored messages (the replay on `hello`, GetState, History), so the two
 * can never disagree. Servers must not reimplement it per path. Other languages
 * implement it against vectors/visibility.json.
 */
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
 * - A viewer that reads as its member (`asMember`) also gets what any of the
 *   member's sessions sent, this one included, and what was addressed to any of
 *   them. The topic still applies, and another member's messages to a third
 *   member stay out of reach.
 */
export function visibleTo(viewer, message) {
    const to = message.to;
    if (!to || (!to.memberId && !to.topic))
        return false;
    if (to.topic && to.topic !== viewer.topic)
        return false;
    if (to.clientSessionId && !to.memberId)
        return false;
    const fromViewer = message.fromMemberId === viewer.memberId;
    if (viewer.asMember)
        return fromViewer || !to.memberId || to.memberId === viewer.memberId;
    if (to.memberId && to.memberId !== viewer.memberId)
        return false;
    if (to.clientSessionId && to.clientSessionId !== viewer.clientSessionId)
        return false;
    if (fromViewer) {
        if (to.memberId !== viewer.memberId && !to.includeSender)
            return false;
        if (message.fromClientSessionId === viewer.clientSessionId)
            return false;
    }
    return true;
}
