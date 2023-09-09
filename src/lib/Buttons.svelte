<script>
export let text = "";
export let left = 0;
export let activeStyle = false;
export let onClick = () => {};

</script>

<button style:margin-left={left + "px"} style={activeStyle ? "color:white;background-color:blue;" : ""} on:click|preventDefault={onClick} >
{text}
</button>

<style>
button {
  border-radius: 100px;
  border: 1px solid blue;
  padding: 10px 30px;
  margin-top: 5px;
  font-size: 14px;
  font-weight: bold;
  color: blue;
}
button:hover {
  background-color: blue;
  color: white;
}
</style>
