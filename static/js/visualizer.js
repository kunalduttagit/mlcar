class Visualizer{
    static drawNetwork(ctx, network){
        const margin = 50
        const left = margin
        const top = margin
        const width = ctx.canvas.width - margin*2
        const height = ctx.canvas.height - margin*2

        const levelHeight = height/network.levels.length
        for(let i = network.levels.length - 1 ; i >= 0; i--){
            const levelTop = top + 
                lerp(
                    height - levelHeight,
                    0,
                    network.levels.length == 1 ? 0.5
                    : i/(network.levels.length - 1) 
                );

            ctx.setLineDash([7,3])

            Visualizer.drawLevel(ctx, network.levels[i], 
                left, levelTop, 
                width, levelHeight,
                i==network.levels.length-1
                    ?['\u2B06','\u2B05','\u27A1','\u2B07']
                    :[]
            );

        }
    }

    static drawLevel(ctx, level, left, top, width, height, outputLabels) {
        const right = left + width
        const bottom = top + height

        const {inputs, outputs, weights, biases} = level; //so instead of level.inputs, we can say, just inputs OR Destructuring assignment :)

        for(let i = 0; i < inputs.length; i++){
            for(let j = 0; j < outputs.length; j++){
                ctx.beginPath()
                ctx.moveTo(
                    Visualizer.#getNodeX(inputs, i, left, right),
                    bottom
                )
                ctx.lineTo(
                    Visualizer.#getNodeX(outputs, j, left, right),
                    top
                )
                ctx.lineWidth = 2
                ctx.strokeStyle = getRGBAS(weights[i][j], inputs[i])
                ctx.stroke()
            }
        }

        const nodeRadius = 18
        for (let i = 0; i<inputs.length; i++){
            const x = Visualizer.#getNodeX(inputs, i, left, right) 
            ctx.beginPath()
            ctx.arc(x, bottom, nodeRadius, 0, Math.PI * 2);
            ctx.fillStyle = "black"
            ctx.fill();

            ctx.beginPath()
            ctx.arc(x, bottom, nodeRadius*0.60, 0, Math.PI * 2); //0.60 meeans 60% of node radius, smaller so that outside is visilble.
            ctx.fillStyle = getRGBA(inputs[i])
            ctx.fill();
        }

        for (let i = 0; i<outputs.length; i++){
            const x = Visualizer.#getNodeX(outputs, i, left, right) 
            ctx.beginPath()
            ctx.arc(x, top, nodeRadius, 0, Math.PI * 2);
            ctx.fillStyle = "black"
            ctx.fill();

            ctx.beginPath()
            ctx.arc(x, top, nodeRadius*0.60, 0, Math.PI * 2);
            ctx.fillStyle = getRGBA(outputs[i])
            ctx.fill();

            ctx.beginPath();
            ctx.lineWidth = 2
            ctx.arc(x, top, nodeRadius*0.80, 0, Math.PI * 2)
            ctx.strokeStyle = getRGBA(biases[i])
            ctx.setLineDash([3,3]) //3px line, 3 px space/dash
            ctx.stroke()
            ctx.setLineDash([])   //reset line dash

            if(outputLabels[i]){
                ctx.beginPath()
                ctx.textAlign = "center"
                ctx.textBaseline = "middle"
                ctx.fillStyle = "black"
                ctx.strokeStyle = "white"
                ctx.font = (nodeRadius*1.2) + "px Helvetica"
                ctx.fillText(outputLabels[i], x, top+nodeRadius*0.06)
                ctx.lineWidth = 0.5
                ctx.strokeText(outputLabels[i], x, top)
            }
        }
    }

    static #getNodeX(nodes, index, left, right){
        return lerp(
            left,
            right, 
            nodes.length == 1 ? 0.5 : index/(nodes.length-1)
        )
    }
}