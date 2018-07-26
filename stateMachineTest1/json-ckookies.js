var characters=[
   {
		'name':'AAA',
		'attacks':[
			{
				type:['fire'],
				'damage':'25%',
				'burn':'50%'
			},
			{
				'type':['water','wind'],
				'damage':'30%',
				'frost':'50%'
			}
		]
	},
	{
		'name':'AAA',
		'attacks':[
			{
				'type':['thunder'],
				'damage':'23%',
				'confusion':'50%'
			},
			{
				'type':['water','earth'],
				'damage':'30%'
			}
		],
        'func':"alert('ola tiago');"
	}
];
var text=JSON.stringify(characters); 
localStorage['data']=text;
var characters2=JSON.parse(localStorage['data']);