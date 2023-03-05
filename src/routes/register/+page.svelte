<script>
  let name
  let email
  let password

  async function submitHandler(e) {
    const buffer = await fetch("http://localhost:8080/session/register", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
    const data = await buffer.json()
    console.log(data);
  }
</script>

<form on:submit|preventDefault={submitHandler}>
  <input type="text" bind:value={name} placeholder="name">
  <input type="text" bind:value={email} placeholder="email">
  <input type="text" bind:value={password} placeholder="password">
  <button type="submit">Register</button>
</form>
