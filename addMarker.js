AFRAME.registerComponent("create-markers", { //estaba mal escrito create-markers
  
    init: async function() {
  
      var mainScene = document.querySelector("#main-scene");
  
      //Toma la colección de platillos de la base de datos Firebase.
      var dishes = await this.getDishes();
     
      dishes.map(dish => {
        var marker = document.createElement("a-marker");   
        marker.setAttribute("id", dish.id);
        marker.setAttribute("type", "pattern");
        marker.setAttribute("url", dish.marker_pattern_url);
        marker.setAttribute("cursor", {
          rayOrigin: "mouse"
        });
  
        //Establece el componente markerhandler.
        marker.setAttribute("markerhandler", {});
        mainScene.appendChild(marker);
  
        // Añade el modelo a la escena.
        var model = document.createElement("a-entity");    
       
        model.setAttribute("id", `model-${dish.id}`); //esta mal el guíon -
        model.setAttribute("position", dish.model_geometry.position);
        model.setAttribute("rotation", dish.model_geometry.rotation);
        model.setAttribute("scale", dish.model_geometry.scale); // estaba mal escrito scale
        model.setAttribute("gltf-model", `url(${dish.model_url})`);
        model.setAttribute("gesture-handler", {}); //esta mal el guíon -
        marker.appendChild(model);
  
        // Contenedor de ingredientes.
        var mainPlane = document.createElement("a-plane");
        mainPlane.setAttribute("id", `main-plane-${dish.id}`); //era un -
        mainPlane.setAttribute("position", { x: 0, y: 0, z: 0 });
        mainPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
        mainPlane.setAttribute("width", 1.7);
        mainPlane.setAttribute("height", 1.5);
        marker.appendChild(mainPlane);
  
        // Plano de fondo para el título del platillo
        var titlePlane = document.createElement("a-plane");
        titlePlane.setAttribute("id", `title-plane-${dish.id}`); //era un -
        titlePlane.setAttribute("position", { x: 0, y: 0.89, z: 0.02 });
        titlePlane.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        titlePlane.setAttribute("width", 1.69);
        titlePlane.setAttribute("height", 0.3);
        titlePlane.setAttribute("material", { color: "#F0C30F" });
        mainPlane.appendChild(titlePlane);
  
        // Título del platillo.
        var dishTitle = document.createElement("a-entity");
        dishTitle.setAttribute("id", `dish-title-${dish.id}`);
        dishTitle.setAttribute("position", { x: 0, y: 0, z: 0.1 });
        dishTitle.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        dishTitle.setAttribute("text", {
          font: "monoid",
          color: "black",
          width: 1.8,
          height: 1,
          align: "center",
          value: dish.dish_name.toUpperCase()
        });
        titlePlane.appendChild(dishTitle);
  
        // Lista de ingredientes.
        var ingredients = document.createElement("a-entity");
        ingredients.setAttribute("id", `ingredientes-${dish.id}`); //checar si la base de datos esta en español
        ingredients.setAttribute("position", { x: 0.3, y: 0, z: 0.1 });
        ingredients.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        ingredients.setAttribute("text", {
          font: "monoid",
          color: "black",
          width: 2,
          align: "left",
          value: `${dish.ingredientes.join("\n\n")}` //checar si la base de datos esta en español
        });
        mainPlane.appendChild(ingredients);
      });
    },
    //Función para tomar la colección de platillos desde la base de datos Firebase.
    getDishes: async function() {
      return await firebase
        .firestore()
        .collection("dishes")
        .get()
        .then(snap => {
          return snap.docs.map(doc => doc.data());
        });
    }
  });
