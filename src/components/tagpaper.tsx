
import "./tagpaper.css"

        const props =  [
            {
                scheduled_date: "10/23(Thu)",
                task_name: "FocusGold IA"
            }
        ]
        
        function choose(props: any) {
            return ["10/23(Thu) FocusGold IA",""]
        }

        const TagPaper = (props: any) => {
            let express = choose(props);
            return (
                <div className="tag_contents" >
                    <p>{express[0]}</p>
                    <p>{express[1]}</p>
                </div>
            )
        }

export default TagPaper;