import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/inspiration")({
  component: () => (
    <div>
      Hello /inspiration!
      <script
        type="module"
        src="https://gradio.s3-us-west-2.amazonaws.com/4.24.0/gradio.js"
      ></script>

      <gradio-app src="https://yisol-idm-vton.hf.space"></gradio-app>
    </div>
  ),
});
