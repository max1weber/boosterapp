export class BoosterStream {


    id: string;
    streamName: string;
    IsSelected: boolean;
    stream_key: string;
    playback_url : string;
    order: number;


    constructor( id: string,
        streamName: string,
        isSelected: boolean,
        stream_key: string,
        playback_url : string,
        order:number)
    {
       this.id = id;
       this.streamName = streamName;
       this.IsSelected = isSelected;
       this.stream_key = stream_key;
       this.playback_url = playback_url;
       this.order = order;
    }

}
