/**
 * Who may read a message: the one rule behind both the live fan-out and every
 * read of stored messages (the replay on `hello`, GetState, History), so the two
 * can never disagree. Servers must not reimplement it per path. Other languages
 * implement it against vectors/visibility.json.
 */
/**
 * - `to.memberId` limits it to that member's sessions, `to.topic` to sessions in
 *   that topic; with both, both must match. A message with neither is read by nobody.
 * - The session that sent it never gets it back.
 * - The sender's other sessions only get it when it names the sender as the
 *   member: a message to a topic is for the other people in it, so two sessions
 *   of the same developer do not interrupt each other with every `done`.
 */
export function visibleTo(viewer, message) {
    const to = message.to;
    if (!to || (!to.memberId && !to.topic))
        return false;
    if (to.memberId && to.memberId !== viewer.memberId)
        return false;
    if (to.topic && to.topic !== viewer.topic)
        return false;
    if (message.fromMemberId === viewer.memberId) {
        if (to.memberId !== viewer.memberId)
            return false;
        if (message.fromClientSessionId === viewer.clientSessionId)
            return false;
    }
    return true;
}
