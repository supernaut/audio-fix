export interface FfprobeOutput {
    streams: FfprobeStream[];
    format: Format;
}

interface Format {
    filename: string;
    nb_streams: number;
    nb_programs: number;
    nb_stream_groups: number;
    format_name: string;
    format_long_name: string;
    start_time: string;
    duration: string;
    size: string;
    bit_rate: string;
    probe_score: number;
    tags: FormatTags;
}

interface FormatTags {
    major_brand: string;
    minor_version: string;
    compatible_brands: string;
    encoder: string;
}

export interface FfprobeStream {
    index: number;
    codec_name: string;
    codec_long_name: string;
    profile?: string;
    codec_type: string;
    codec_tag_string: string;
    codec_tag: string;
    width?: number;
    height?: number;
    coded_width?: number;
    coded_height?: number;
    closed_captions?: number;
    film_grain?: number;
    has_b_frames?: number;
    sample_aspect_ratio?: string;
    display_aspect_ratio?: string;
    pix_fmt?: string;
    level?: number;
    chroma_location?: string;
    field_order?: string;
    refs?: number;
    is_avc?: string;
    nal_length_size?: string;
    id: string;
    r_frame_rate: string;
    avg_frame_rate: string;
    time_base: string;
    start_pts: number;
    start_time: string;
    duration_ts: number;
    duration: string;
    bit_rate?: string;
    bits_per_raw_sample?: string;
    nb_frames: string;
    extradata_size?: number;
    disposition: { [key: string]: number };
    tags: StreamTags;
    sample_fmt?: string;
    sample_rate?: string;
    channels?: number;
    channel_layout?: string;
    bits_per_sample?: number;
    initial_padding?: number;
    side_data_list?: SideDataList[];
}

interface SideDataList {
    side_data_type: string;
    service_type: number;
}

interface StreamTags {
    language?: string;
    title?: string;
    [key: string]: string | undefined;
}
