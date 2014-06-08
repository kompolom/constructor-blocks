({
    mustDeps: [
       {
        tech: 'bemhtml',
        block:'i-bem',
        elem:'dom'
      },
      {block:'spin'},      
      {
        tech:'bemhtml',
        block:'input'
      },
      {
        tech:'bemhtml',
        block:'input',
        mods:{type:'hidden'},
      }
    ],
    tech: 'js',
    shouldDeps: [
      {block:'input',mods:{type:['hidden'],required:true}},
      {block:'respond'}
    ]
})