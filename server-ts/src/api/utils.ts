export const toLowerCamelCase = (input: string) : string => {
    return input[0].toLowerCase() + input.substring(1)
  }
  
  export const nestObject = (original: any, propName: string) : any => {
    const result: {[propName:string]: any} = {}
    for(const [k, v] of Object.entries(original)){
      if(k.startsWith(propName)){    
        if(v != null){
          let nested = result[propName] || {}
          nested[toLowerCamelCase(k.substring(propName.length))] = v
          result[propName] = nested
        }
      }else{
        result[k] = original[k]
      }
    }
    return result
  }
