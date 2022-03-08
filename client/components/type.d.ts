interface Slide {
    type: string,
    image?: string,
    title?: string,
    text?: string,
    visible?: Boolean,
    items?: Array<string>,
    notes?: Array<string>
}
export default Slide
