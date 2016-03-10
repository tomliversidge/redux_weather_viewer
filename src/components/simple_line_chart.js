import React from 'react';
import _ from 'lodash';
import { Sparklines, SparklinesLine, SparklinesReferenceLine} from 'react-sparklines';

function Average(data){
    return _.round(_.sum(data)/data.length);
}

export default (props) =>{
    return (
        <div>
            <Sparklines height={120} width={180} data={props.data}>
                <SparklinesLine color={props.colour}/>
                <SparklinesReferenceLine type="avg"/>
            </Sparklines>
            <div>Average {Average(props.data)} {props.units}</div>
        </div>
    )
}