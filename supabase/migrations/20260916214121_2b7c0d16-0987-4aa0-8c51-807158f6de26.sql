REVOKE ALL ON FUNCTION public.handle_new_user_admin() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.grant_admin_on_allowlist() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;

DROP POLICY "Published projects are public" ON public.projects;

CREATE POLICY "Visitors can view published projects"
ON public.projects FOR SELECT TO anon
USING (published);

CREATE POLICY "Signed in users can view projects"
ON public.projects FOR SELECT TO authenticated
USING (published OR public.has_role(auth.uid(), 'admin'));