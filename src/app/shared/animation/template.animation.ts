import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  state,
  keyframes
} from "@angular/animations";

export const listAnimation = [ trigger("listAnimationfirst", [
  transition("* => *", [
    query(
      ":leave",
      [stagger(100, [animate("0.2s", style({ opacity: 0 }))])],
      { optional: true }
    ),
    query(
      ":enter",
      [
        style({ opacity: 0 }),
        stagger(100, [animate("0.2s", style({ opacity: 1 }))])
      ],
      { optional: true }
    )
  ])
]),
trigger(
  'enterAnimation', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('200ms', style({ transform: 'translateX(0)', opacity: 1, 'overflow-x': 'hidden' }))
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0)', opacity: 1 }),
    animate('200ms', style({ transform: 'translateX(100%)', opacity: 0 }))
  ])
]
),
trigger('slideIn', [
  state('*', style({ 'overflow-y': 'hidden' })),
  state('void', style({ 'overflow-y': 'hidden' })),
  transition('* => void', [
    style({ height: '*' }),
    animate(200, style({ height: 0 }))
  ]),
  transition('void => *', [
    style({ height: '0' }),
    animate(200, style({ height: '*' }))
  ])
])]

export const rowTableAnimation =  [
  trigger('chaChaSlide', [
  state('leave', style({transform: 'translateX(-200px)', opacity: 0, height: 0})),
  state('enter', style({transform: 'translateX(-200px)', opacity: 1, height: 0})),
  transition('*=>leave', [
    query('.content', style({height:0})),
    animate(300),
  ]),
  transition('*=>enter', [
    query('.content', style({height:0})),
    animate(300),
  ]),
  transition('true=>void', animate(200, 
    style({transform: 'translateX(-200px)', opacity: 0, height: 0})
  ))
])
]

export const rowTableAnimationFull = [
  trigger("listAnimation", [
  transition("* => *", [
    // each time the binding value changes
    query(
      ":leave",
      [stagger(100, [animate("0.2s", style({ opacity: 0 }))])],
      { optional: true }
    ),
    query(
      ":enter",
      [
        style({ opacity: 0 }),
        stagger(100, [animate("0.2s", style({ opacity: 1 }))])
      ],
      { optional: true }
    )
  ])
]),
trigger(
  'enterAnimation', [
    transition(':enter', [
      style({transform: 'translateX(100%)', opacity: 0}),
      animate('200ms', style({transform: 'translateX(0)', opacity: 1, 'overflow-x': 'hidden'}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0)', opacity: 1}),
      animate('200ms', style({transform: 'translateX(100%)', opacity: 0}))
    ])
  ]
),
trigger('slideIn', [
  state('*', style({ 'overflow-y': 'hidden' })),
  state('void', style({ 'overflow-y': 'hidden' })),
  transition('* => void', [
    style({ height: '*' }),
    animate(200, style({ height: 0 }))
  ]),
  transition('void => *', [
    style({ height: '0' }),
    animate(200, style({ height: '*' }))
  ])
])]