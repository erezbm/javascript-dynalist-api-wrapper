export type Preferences = {
  /** Location of the inbox. */
  'inbox_location': string;
  /** Where to insert a node to the inbox. */
  'inbox_move_position': 'top' | 'bottom';
};

export type PreferenceKey = keyof Preferences;
