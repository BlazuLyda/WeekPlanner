<script>
  import { onMount } from "svelte"
  import myax from "/src/lib/myax";

  let userLoggedIn
  let email
  let password
  let message

  $: {
    console.log("userLoggedIn", userLoggedIn);
  }

  onMount(() => {
    myax.get("/account")
      .then(() => userLoggedIn = true)
      .catch(() => userLoggedIn = false)
  })

  async function loginHandler(e) {
    const resObject = await myax.post("/session/login", { email, password })
      .catch((err) => { message = err.response.data || err })

    if (resObject) {
      userLoggedIn = true
      message = resObject.data
    }
  }

  async function logoutHandler(e) {
    const resObject = await myax.post("/session/logout")
      .catch((err) => message = err.response.data || err)

    if (resObject) {
      userLoggedIn = false
      message = resObject.data
    }
  }
</script>

<form on:submit|preventDefault={loginHandler}>
  <input type="text" bind:value={email} placeholder="email">
  <input type="text" bind:value={password} placeholder="password">

  {#if !userLoggedIn}
    <button type="submit">Log in</button>
  {:else}
    <button on:click|preventDefault={logoutHandler}>Log out</button>
  {/if}
</form>

{#if message}
  <p>{JSON.stringify(message)}</p>
{/if}