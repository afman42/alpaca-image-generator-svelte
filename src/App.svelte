<script>
import Buttons from "./lib/Buttons.svelte";
import dataAlpaca from "./data";
import html2canvas from "html2canvas";

const cloneOptions = () =>
  Object.fromEntries(
    Object.entries(dataAlpaca).map(([category, items]) => [
      category,
      items.map((item) => ({ ...item })),
    ])
  );

const buildSelections = (options) =>
  Object.fromEntries(
    Object.entries(options).map(([category, items]) => [
      category,
      items.find((item) => item.selected) ?? items[0],
    ])
  );

const formatCategoryLabel = (category) =>
  category.charAt(0).toUpperCase() + category.slice(1);

let alpacaOptions = cloneOptions();
let selectedParts = buildSelections(alpacaOptions);
let activeCategory = "hair";
let canvas;

$: selectableCategories = Object.keys(alpacaOptions).filter(
  (category) => category !== "nose"
);
$: styleOptions = alpacaOptions[activeCategory] ?? [];

function setSelection(category, name) {
  const updatedCategory = alpacaOptions[category].map((item) => ({
    ...item,
    selected: item.name === name,
  }));

  const selected =
    updatedCategory.find((item) => item.selected) ?? updatedCategory[0];

  alpacaOptions = { ...alpacaOptions, [category]: updatedCategory };
  selectedParts = { ...selectedParts, [category]: selected };
}

function handleCategoryChange(category) {
  activeCategory = category;
}

function randomize() {
  const nextOptions = {};
  const nextSelected = {};

  for (const [category, items] of Object.entries(alpacaOptions)) {
    const randomItem = items[Math.floor(Math.random() * items.length)];

    nextOptions[category] = items.map((item) => ({
      ...item,
      selected: item.id === randomItem.id,
    }));

    nextSelected[category] =
      nextOptions[category].find((item) => item.selected) ?? randomItem;
  }

  alpacaOptions = nextOptions;
  selectedParts = nextSelected;
}

async function download() {
  if (!canvas) return;

  const cnvs = await html2canvas(canvas);
  const link = document.createElement("a");
  link.download = "alpaca.png";
  link.href = cnvs.toDataURL();
  link.click();
}
</script>

<div class="container">
  <h1>ALPACA GENERATOR</h1>
  <div class="box">
    <div class="box-image">
      <div
        bind:this={canvas}
        class="box-color"
        style={`background-image:url(${selectedParts.backgrounds.image});`}
      >
        <img src={selectedParts.mouth.image} style="z-index:1;" alt="mouth" />
        <img src={selectedParts.leg.image} alt="leg" style="left:0px;" />
        <img src={selectedParts.hair.image} alt="hair" />
        <img src={selectedParts.eyes.image} style="z-index:1;" alt="eyes" />
        <img src={selectedParts.ears.image} alt="ears" />
        <img src={selectedParts.neck.image} alt="neck" />
        <img src={selectedParts.accessories.image} alt="accessories" />
        <img src={selectedParts.nose.image} alt="nose" />
      </div>
      <div style="display:flex; flex-direction:row; margin-top:20px;width:100%;">
        <button
          on:click|preventDefault={randomize}
          style="cursor:pointer;color:black;background-color:white;border:none;padding:10px;width:100%;margin-right:10px;"
        >Random</button>
        <button
          on:click|preventDefault={download}
          style="cursor:pointer;color:black;background-color:white;border:none;padding:10px;width:100%;"
        >Download</button>
      </div>
    </div>
     <div class="box-button">
        <h6>ACCESSORIES THE ALPACA'S</h6>
        <div class="box-inside-button">
          {#each selectableCategories as category}
            <Buttons
              text={formatCategoryLabel(category)}
              activeStyle={category === activeCategory}
              onClick={() => handleCategoryChange(category)}
            />
          {/each}
        </div>
        <h6>STYLE</h6>
        <div class="box-inside-button">
          {#each styleOptions as item}
            <Buttons
              text={item.name}
              activeStyle={item.selected}
              onClick={() => setSelection(activeCategory, item.name)}
            />
          {/each}
        </div>
    </div>
</div>
</div>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');

* {
  font-family: 'Roboto', sans-serif;
  box-sizing: border-box;
  margin:0;
  padding:0;
}

.container { 
  min-height: 100vh;
  width: 800px;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
}
.box {
  display: flex;
  flex-direction: row;
}
.box-image {
  display:flex;
  flex-direction:column;
}
.box-button {
  display: flex;
  flex-direction: column;
  margin-left:30px;
  width: 300px;
}
h6 {
  margin-bottom:30px;
}
.box-inside-button {
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  margin-top: -20px;
  width: 350px;
  margin-bottom:30px;
}

.box-color {
  position:relative;
  width:300px;
  height:300px;
}

.box-color > img {
  position: absolute;
  top:0px;
  width: 300px;
}
@media only screen and (max-width: 600px) and (min-width: 300px) {
  .container {
    width: 100%;
  }
  .box-color {
    width: 100%;
  }
  .image-leg {
    left:30px;
  }
  h1 {
    text-align:center;
  }
  .box {
    display: flex;
    flex-direction: column;
  }
  .box-image {
    margin-bottom: 30px;
  }
  h6 {
    margin-bottom:30px;
  }
  .box-button {
    width: 100%;
    margin:0;
  }
} 

</style>
