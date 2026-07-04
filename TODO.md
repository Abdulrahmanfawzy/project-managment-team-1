# TODO - Continue Meetings CRUD

- [ ] Gather remaining code for meetings Update/Delete: check for existing edit/delete UI hooks/components.
- [ ] Implement meetings update/delete API endpoints in `src/features/meetings/api/meeting.api.ts`.
- [ ] Add React Query hooks for update & delete in `src/features/meetings/hooks/`.
- [ ] Add UpdateMeetingModal (prefill + validation) and wire it to update hook.
- [ ] Update MeetingCard: render Edit/Delete icons in top-right only when `currentUserId === meeting.created_by`.
- [ ] Implement delete flow: SweetAlert confirmation, call delete API, refresh list, success/error alerts.
- [ ] Fix filtering: ensure MonthFilter selection & week navigation updates visible meetings immediately, including after create/update/delete (via query invalidation).
- [ ] Add/adjust typing for `currentUserId` (from token or existing auth util) to avoid TS/ESLint errors.
- [x] Run `yarn lint` and verify no TS/ESLint errors for meetings CRUD implementation.
