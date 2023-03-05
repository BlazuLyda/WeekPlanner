<script>
  import { Router, Link } from "svelte-spa-router"
  import Register from "./register/+page.svelte"
  import Login from "./login/+page.svelte";
  import Index from "./+page.svelte";
</script>

<Router>
  <Index path="/" />
  <Register path="/register" />
  <Login path="/login" />
</Router>