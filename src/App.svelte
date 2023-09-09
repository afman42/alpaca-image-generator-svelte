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
      link.download = "lamb.png";
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
    <div style="display:flex;flex-direction:column;">
      <div bind:this={findData.canvas} style="postion:relative;width:300px;height:300px;background-image:url({findData.backgrounds.image});">
        <img src={findData.mouth.image} style="position: absolute;bottom:200px; width: 300px;z-index:1;" alt="mouth" />
        <img src={findData.leg.image} style="position: absolute;bottom:194px;left:290px; width: 300px;" alt="leg" />
        <img src={findData.hair.image} style="position: absolute;bottom:200px; width: 300px;" alt="hair" />
        <img src={findData.eyes.image} style="position: absolute;bottom:200px; width: 300px;z-index:1;" alt="eyes" />
        <img src={findData.ears.image} style="position: absolute;bottom:194px; width: 300px;" alt="ears" />
        <img src={findData.neck.image} style="position: absolute;bottom:194px; width: 300px;" alt="neck"/>
        <img src={findData.accessories.image} style="position: absolute;bottom:200px;width:300px;" alt="accessories" />
        <img src={findData.nose.image} style="position: absolute;bottom:200px;width:300px;" alt="nose" />

      </div>
      <div style="display:flex; flex-direction:row; margin-top:20px;width:100%;">
        <button on:click|preventDefault={() => findData.random()} style="cursor:pointer;color:black;background-color:white;border:none;padding:10px;width:100%;margin-right:10px;">Random</button>
        <button on:click|preventDefault={() => findData.download()} style="cursor:pointer;color:black;background-color:white;border:none;padding:10px;width:100%;">Download</button>
      </div>
    </div>
     <div class="box-button">
        <h6>ACCESSORIES THE ALPACA'S</h6>
        <div class="box-inside-button">
          <Buttons text="Mouth" activeStyle={activeStyleFunction('mouth',findData.text)} onClick={() => findData.text = "mouth"} />
          <Buttons text="Leg"  activeStyle={activeStyleFunction('leg',findData.text)} onClick={() => findData.text = "leg"} left={5} />
          <Buttons text="Hair" activeStyle={activeStyleFunction('hair',findData.text)} onClick={() => findData.text = "hair"} left={5} />
          <Buttons text="Eyes" activeStyle={activeStyleFunction('eyes',findData.text)} onClick={() => findData.text = "eyes"} />
          <Buttons text="Ears" activeStyle={activeStyleFunction('ears',findData.text)} onClick={() => findData.text = "ears"} left={5} />
          <Buttons text="Neck" activeStyle={activeStyleFunction('neck',findData.text)} onClick={() => findData.text = "neck"} left={5} />
          <Buttons text="Accessories" activeStyle={activeStyleFunction('accessories',findData.text)}  onClick={() => findData.text = "accessories"} />
          <Buttons text="Backgrounds" activeStyle={activeStyleFunction('backgrounds',findData.text)} onClick={() => findData.text = "backgrounds"} left={5} />
        </div>
        <h6>STYLE</h6>
        <div class="box-inside-button" style="width: 350px;">
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
.box-button {
  display: flex;
  flex-direction: column;
  margin-left:30px;
  width: 300px;
  margin-top: -20px;
}
.box-inside-button {
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  margin-top: -20px;
}
</style>
