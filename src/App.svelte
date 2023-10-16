<script>
import Buttons from "./lib/Buttons.svelte" 
import dataAlpaca from "./data"
import html2canvas from "html2canvas"

let findData = {
  text: "hair",
  canvas: null,
  mouth: dataAlpaca['mouth'][0],
  nose: dataAlpaca['nose'][0],
  leg: dataAlpaca['leg'][0],
  hair: dataAlpaca['hair'][0],
  eyes: dataAlpaca['eyes'][0],
  ears: dataAlpaca['ears'][0],
  neck: dataAlpaca['neck'][0],
  accessories: dataAlpaca['accessories'][0],
  backgrounds: dataAlpaca['backgrounds'][0],
  get getDataItem(){
    return dataAlpaca[this.text]
  },
  set setDataItem(item){
    dataAlpaca[this.text] = item;
  },
  random(){
    Object.keys(dataAlpaca).forEach(v => {
       let combine = dataAlpaca[v].map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item)

      findData[v] = combine[0]
      dataAlpaca[v] = combine.map((v,i) => {
        if(v.selected){
          return {
            ...v,
            selected: false
          }
        }
        if(i === 0){
          return {
            ...v,
            selected: true
          }
        }
        return {
          ...v,
          selected: false
        }
      })
    })
  },
  download(){
    html2canvas(this.canvas).then(cnvs => {
      var link = document.createElement("a");
      link.download = "alpaca.png";
      link.href = cnvs.toDataURL();
      link.click();
    })
  },
  imageClick(findtext,name){
    let tempDataItem = this.getDataItem.map((value) => {
      if(value.name.includes(name)){
        return {
          ...value,
          selected: !value.selected,
        }
      }  
      return  {
        ...value,
        selected: false,
      }
    })

    findData[findtext] = tempDataItem.find((value) => value.name.includes(name))
    this.setDataItem = tempDataItem
  }
};

$: getDataAlpaca = Object.keys(dataAlpaca).filter(v => v !== "nose");

function activeStyleFunction(text,findtext){
  if(text == findtext){
    return true;
  }
  return false;
}
</script>

<div class="container">
  <h1>ALPACA GENERATOR</h1>
  <div class="box">
    <div class="box-image">
      <div bind:this={findData.canvas} class="box-color" style="background-image:url({findData.backgrounds.image});">
        <img src={findData.mouth.image} style="z-index:1;" alt="mouth" />
        <img src={findData.leg.image} alt="leg" style="left:0px;" />
        <img src={findData.hair.image} alt="hair" />
        <img src={findData.eyes.image} style="z-index:1;" alt="eyes" />
        <img src={findData.ears.image} alt="ears" />
        <img src={findData.neck.image} alt="neck"/>
        <img src={findData.accessories.image} alt="accessories" />
        <img src={findData.nose.image} alt="nose" />

      </div> 
      <div style="display:flex; flex-direction:row; margin-top:20px;width:100%;">
        <button on:click|preventDefault={() => findData.random()} style="cursor:pointer;color:black;background-color:white;border:none;padding:10px;width:100%;margin-right:10px;">Random</button>
        <button on:click|preventDefault={() => findData.download()} style="cursor:pointer;color:black;background-color:white;border:none;padding:10px;width:100%;">Download</button>
      </div>
    </div>
     <div class="box-button">
        <h6>ACCESSORIES THE ALPACA'S</h6>
        <div class="box-inside-button">
          {#each getDataAlpaca as item}
            <Buttons text={item[0].toUpperCase() + item.substring(1,item.length)} activeStyle={activeStyleFunction(item,findData.text)} onClick={() => findData.text = item} />
          {/each}
        </div>
        <h6>STYLE</h6>
        <div class="box-inside-button">
          {#each findData.getDataItem as item }
            <Buttons text={item.name} activeStyle={item.selected} onClick={() => findData.imageClick(findData.text,item.name)} />
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
