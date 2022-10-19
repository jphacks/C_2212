
import "./tagpaper.css"


        function choose(props: any) {
            return ["10/23(Thu) FocusGold IA",]
        }

        const TagPaper = (props: any) => {
            let express = choose(props);
            return (
                <div className="tag_contents" >
                    {express.map((name, index) => {
                        if(name !== ""){
                            return(<p>{name}</p>)
                        }
                    })}
                </div>
            )
        }

export default TagPaper;