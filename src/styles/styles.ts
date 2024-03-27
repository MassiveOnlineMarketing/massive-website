export const constants = {
  glassStroke: "relative gradient-mask glass-border-gradient",
  glassFill: " backdrop-blur-[7px] bg-gradient-to-b from-[#fff]/60 to-[#fff]/50",

  darkStroke: "relative gradient-mask dark-glass-border-gradient",
  darkFill: "backdrop-blur-[7px] bg-gradient-to-b from-[#1F29371A]/60 to-[#1F29371A]/50",

  glassFill2: "bg-gradient-to-b from-[#fff]/60 to-[#fff]/50",
}

const container = {
  // standard section gutter
  sectionGutter: 'px-[12px] md:px-[60px] lg:px-16',
  // standard section gutter with max width
  maxWidthGutter: 'max-w-[1428px] mx-auto px-[12px] md:px-[60px] lg:px-16',
  // extra padding on md, used on content inside a container
  maxWidthGutterExtraPaddingMd: 'max-w-[1428px] mx-auto px-[24px] md:px-[60px] lg:px-16',
  // only the extra padding on md
  extraPaddingMd: 'px-[12px] md:px-0',
  maxWidth: 'max-w-[1428px] mx-auto  ',

  // standard section padding
  sectionPadding: 'py-[100px]',
  sectionPaddingTop: 'pt-[100px]',
  sectionPaddingBottom: 'pb-[100px]',
  
 
  gutter: 'px-4', 
}

export const styles = {
  glass: `${constants.glassStroke} ${constants.glassFill} shadow-md`,
  darkGlass: `${constants.darkStroke} ${constants.darkFill} shadow-md`,
}



export default container