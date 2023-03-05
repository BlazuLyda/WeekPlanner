<script>
  import axios from "axios"

  const fetchUserData = async () => {
    const resObject = await axios.get("http://localhost:8080/account", { withCredentials: true })
    return resObject.data
  }
</script>

<h1>Welcome to the page!</h1>

{#await fetchUserData()}
  <p>Fetching data...</p>
{:then userData}
  <p>name: {userData.name}, email: {userData.email}</p>
{:catch error}
  <p>You are not logged in!</p>
{/await}
