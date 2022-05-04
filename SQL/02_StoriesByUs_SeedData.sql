USE [StoriesByUs]
GO

SET QUOTED_IDENTIFIER OFF;

SET IDENTITY_INSERT [UserType] ON
INSERT INTO [UserType] ([ID], [Name]) VALUES (1, 'Admin'), (2, 'ReaderAuthor');
SET IDENTITY_INSERT [UserType] OFF

SET IDENTITY_INSERT [User] ON
INSERT INTO [User] (
	[Id], [FirebaseUserId], [DisplayName], [Email], [UserTypeId], [Bio])
VALUES (1, '13hHvMXBWWZ8eyoKNUfaLbZyoK43', 'sorac', 'sora@place.com', 1, 'I love my pets'),
       (2, '4qCXJ35Bpvfl6JoyE4sPCIaIfbf1', 'freds', 'fred@place.com', 2, 'I am super duper lame'),
       (3, 'e2gN7h3oVXdTef3c1o5mvLl8Rsk2', 'jasminep', 'jasmine@place.com', 2, 'I am pretty awesome');
SET IDENTITY_INSERT [User] OFF

SET IDENTITY_INSERT [Genre] ON
INSERT INTO [Genre] ([Id], [Name]) 
VALUES (1, 'Drama'), (2, 'Comedy'), (3, 'Adventure'), (4, 'Friendship'), (5, 'Tragedy'), 
	   (6, 'Horror'), (7, 'Mystery/Crime'), (8, 'Fantasy'), (9, 'Science Fiction'), 
	   (10, 'Romance'), (11, 'Thriller'), (12, 'Historical'), (13, 'Western'), (14, 'Dystonian'), (15, 'Action/Adventure'), 
	   (16, 'Coming of Age'), (17, 'Fairytale'), (18, 'Poetry'), (19, 'Political'), 
	   (20, 'Satire'), (21, 'Suspense'), (22, 'Young Adult'), (23, 'Mythology/Folklore'), (24, 'Parody/Satire');
SET IDENTITY_INSERT [Genre] OFF

SET IDENTITY_INSERT [Tag] ON
INSERT INTO [Tag] ([Id], [Name])
VALUES (1, 'Time Travel'), (2, 'Unrequited Love'), (3, 'Fluff'), (4, 'Violence'), (5, 'Angst'), (6, 'War'), (7, 'Friends to Lovers'), (8, 'Roommates'), (9, 'Espionage'), (10, 'Tea'), (11, 'Government'), (12, 'Magic'), (13, 'Swearing'), (14, 'Secrets'), (15, 'Slow Burn'), (16, 'Hospital'), (17, 'School'), (18, 'Crack'), (19, 'Crack Treated Seriously'), (20, 'Time Loop'), (21, 'Space'), (22, 'Medieval'), (23, 'Reincarnation'), (24, 'Soulmates'), (25, 'Illness'), (26, 'Snakes'), (27, 'Moral Dilemmas'), (28, 'Betrayal'), (29, 'Enemies to Friends'), (30, 'Enemies to Lovers'), (31, 'Grief/Mourning'), (32, 'Suicide'), (33, 'Death'), (34, 'Hurt/Comfort'), (35, 'Epic'), (36, 'Happy Ending'), (37, 'Jealousy'), (38, 'Falling in Love'), (39, 'Alcohol Use'), (40, 'Drug Use'), (41, 'Science'), (42, 'Aftermath'), (43, 'Dimension Travel'), (44, 'First Time'), (45, 'Demons'), (46, 'Supernatural Elements'), (47, 'Orphans'), (48, 'No Romance'), (49, 'Cats'), (50, 'Self-Indulgent'), (51, 'Alternate Universe'), (52, 'Abuse'), (53, 'Established Relations'), (54, 'Found Family'), (55, 'Protective'), (56, 'Hate'), (57, 'Tense'), (58, 'Nerdy'), (59, 'Geeky'), (60, 'Cute'), (61, 'Insanity'), (62, 'Oneshot'), (63, 'Drabbles'), (64, 'Collection'), (65, 'Love at First Sight'), (66, 'Long'), (67, 'Strong Femal Characters'), (68, 'Female Friendship'), (69, 'Male Friendship'), (70, 'Male-Female Friendship'), (71, 'Male-Male Pairing'), (72, 'Female-Female Pairing'), (73, 'Male-Female Pairing'), (74, 'Confessions'), (75, 'Kids'), (76, 'Developing Friendships'), (77, 'Age Regresssion'), (78, 'Politics'), (79, 'Telepathy'), (80, 'Geniuses'), (81, 'Transgender Themes'), (82, 'Queer'), (83, 'Superpowers'), (84, 'Childhood'), (85, 'Body Switch'), (86, 'Ninjas'), (87, 'Cheesy'), (88, 'Trauma'), (89, 'Unresolved Sexual Tension'), (90, 'Religion'), (91, 'Queerplatonic Relationships'), (92, 'Platonic Relationships'), (93, 'PTSD'), (94, 'Dysfunctional Family'), (95, 'Misunderstandings'), (96, 'Meta'), (97, 'Whump'), (98, 'Pizza'), (99, 'First Meetings'), (100, 'Cooking');
SET IDENTITY_INSERT [Tag] OFF

SET IDENTITY_INSERT [Rating] ON
INSERT INTO [Rating] ([Id], [Level])
VALUES (1, 'G'), (2, 'PG'), (3, 'PG-13'), (4, 'R'), (5, 'NC-17');
SET IDENTITY_INSERT [Rating] OFF

SET IDENTITY_INSERT [Story] ON
INSERT INTO [Story] (
	[Id], [Title], [Summary], [Notes], [PublishedDateTime], [LastUpdatedDateTime], [RatingId], [UserId], [Complete])
VALUES (1, 'Lorem ipsum', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi etiam dignissim diam quis enim lobortis. Purus gravida quis blandit turpis cursus. Proin libero nunc consequat interdum varius sit. Fringilla ut morbi tincidunt augue interdum velit euismod in. Ultrices in iaculis nunc sed augue lacus viverra.', NULL, '2020-01-19', '2020-01-19', 1, 1, 0), (2, 'Claw drapes', 'You have cat to be kitten me right meow ooooh feather moving feather! for eat a plant, kill a hand. Asdflkjaertvlkjasntvkjn (sits on keyboard) Gate keepers of hell or massacre a bird in the living room and then look like the cutest and most innocent animal on the planet.', NULL, '2020-01-20', '2020-01-23', 2, 1, 1);
SET IDENTITY_INSERT [Story] OFF

SET IDENTITY_INSERT [Chapter] ON
INSERT INTO [Chapter] (
	[Id], [Title], [Body], [PlaceInOrder], [Notes], [StoryId], [WordCount])
VALUES (1, 'Viverra vitae', '<p>In nisl nisi scelerisque eu ultrices vitae auctor eu augue. Aliquam sem et tortor consequat id porta nibh venenatis. In aliquam sem fringilla ut morbi. Quam id leo in vitae turpis massa. Elementum integer enim neque volutpat ac tincidunt vitae semper quis. Vestibulum rhoncus est pellentesque elit. Turpis in eu mi bibendum neque egestas congue quisque. In hendrerit gravida rutrum quisque non tellus orci. Nisi quis eleifend quam adipiscing vitae proin sagittis. Cursus mattis molestie a iaculis at erat. Faucibus nisl tincidunt eget nullam non nisi est sit amet. Scelerisque eu ultrices vitae auctor eu augue. Congue nisi vitae suscipit tellus mauris. Diam maecenas sed enim ut. Condimentum vitae sapien pellentesque habitant morbi. Eros in cursus turpis massa tincidunt dui. Molestie ac feugiat sed lectus. Eget lorem dolor sed viverra ipsum. Semper viverra nam libero justo.</p>

<p>Pulvinar proin gravida hendrerit lectus. Sed elementum tempus egestas sed sed risus. Gravida arcu ac tortor dignissim convallis aenean. Enim lobortis scelerisque fermentum dui faucibus. Fermentum dui faucibus in ornare quam viverra orci sagittis eu. Est ultricies integer quis auctor elit. Blandit turpis cursus in hac habitasse platea dictumst quisque. Sapien eget mi proin sed libero. Purus viverra accumsan in nisl. At urna condimentum mattis pellentesque id nibh tortor. Dictum varius duis at consectetur lorem donec massa sapien. Sed augue lacus viverra vitae. Senectus et netus et malesuada fames ac turpis egestas. Consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat. Arcu vitae elementum curabitur vitae nunc sed. Sit amet purus gravida quis blandit turpis cursus. Risus ultricies tristique nulla aliquet enim tortor at auctor urna. Montes nascetur ridiculus mus mauris vitae ultricies leo.</p>

<p>Amet risus nullam eget felis eget nunc lobortis mattis aliquam. Vulputate enim nulla aliquet porttitor lacus luctus. Lacus vestibulum sed arcu non. Faucibus scelerisque eleifend donec pretium vulputate sapien nec. Facilisis mauris sit amet massa vitae tortor condimentum lacinia quis. Feugiat nisl pretium fusce id velit ut. Odio tempor orci dapibus ultrices in iaculis. Volutpat diam ut venenatis tellus. Ut etiam sit amet nisl purus in mollis. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae. Maecenas pharetra convallis posuere morbi leo urna molestie. Nullam vehicula ipsum a arcu. Vivamus arcu felis bibendum ut tristique et egestas quis. Praesent semper feugiat nibh sed pulvinar. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae. Neque volutpat ac tincidunt vitae semper quis lectus nulla.</p>

<p>Mattis nunc sed blandit libero volutpat sed cras ornare. Nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit. Orci porta non pulvinar neque. Eu turpis egestas pretium aenean pharetra magna ac placerat vestibulum. Auctor neque vitae tempus quam pellentesque nec nam. Nibh sed pulvinar proin gravida hendrerit lectus. Vulputate ut pharetra sit amet aliquam id diam maecenas ultricies. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Sed risus ultricies tristique nulla aliquet enim tortor. Cursus risus at ultrices mi tempus imperdiet nulla malesuada. Ut diam quam nulla porttitor massa id neque. Turpis egestas integer eget aliquet. Sagittis eu volutpat odio facilisis mauris sit amet. Purus ut faucibus pulvinar elementum integer enim.</p>

<p>Nec feugiat in fermentum posuere urna nec tincidunt. Porttitor massa id neque aliquam vestibulum. Consectetur adipiscing elit duis tristique sollicitudin. Eu nisl nunc mi ipsum faucibus vitae. Odio ut sem nulla pharetra diam. Mattis nunc sed blandit libero volutpat sed cras ornare. Venenatis a condimentum vitae sapien pellentesque habitant morbi. Sapien eget mi proin sed libero. Semper viverra nam libero justo. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis.</p>

<p>Volutpat lacus laoreet non curabitur gravida arcu ac. Pharetra vel turpis nunc eget lorem dolor sed viverra ipsum. Sit amet commodo nulla facilisi nullam vehicula ipsum a arcu. Id eu nisl nunc mi ipsum faucibus vitae aliquet. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Ultricies leo integer malesuada nunc. Convallis posuere morbi leo urna molestie at. Viverra aliquet eget sit amet tellus. Molestie at elementum eu facilisis sed odio morbi quis commodo. Proin sed libero enim sed faucibus turpis. Vitae sapien pellentesque habitant morbi tristique senectus. Volutpat consequat mauris nunc congue nisi. Ante metus dictum at tempor. Nam at lectus urna duis convallis convallis. Ut venenatis tellus in metus vulputate eu. Vivamus arcu felis bibendum ut tristique et. Egestas purus viverra accumsan in.</p>

<p>Auctor eu augue ut lectus arcu. Eget nullam non nisi est sit. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Tortor consequat id porta nibh. In mollis nunc sed id semper risus in hendrerit gravida. Quam elementum pulvinar etiam non. Ut sem viverra aliquet eget sit amet tellus cras adipiscing. Nunc id cursus metus aliquam eleifend mi. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Viverra tellus in hac habitasse platea dictumst vestibulum. Id aliquet lectus proin nibh nisl condimentum id. Tempor nec feugiat nisl pretium fusce id velit ut tortor. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque. Vitae congue eu consequat ac felis donec. Blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada. Risus nec feugiat in fermentum posuere urna. Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Consectetur adipiscing elit ut aliquam purus sit amet luctus.</p>

<p>Eget nunc scelerisque viverra mauris in aliquam sem fringilla ut. Tincidunt id aliquet risus feugiat. Vitae justo eget magna fermentum iaculis eu non diam. Lectus arcu bibendum at varius. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Turpis cursus in hac habitasse platea dictumst quisque. Nisl purus in mollis nunc sed id. Dolor sit amet consectetur adipiscing elit duis tristique sollicitudin. At imperdiet dui accumsan sit amet. Nulla at volutpat diam ut venenatis tellus. Nec sagittis aliquam malesuada bibendum arcu. Nibh nisl condimentum id venenatis a. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Et malesuada fames ac turpis egestas. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin libero. Eget aliquet nibh praesent tristique magna sit amet. Habitasse platea dictumst vestibulum rhoncus est. Suspendisse interdum consectetur libero id faucibus nisl tincidunt.</p>

<p>Leo integer malesuada nunc vel risus commodo. Quisque id diam vel quam elementum pulvinar etiam. Sit amet mauris commodo quis. Dui sapien eget mi proin sed libero enim sed faucibus. Enim ut sem viverra aliquet eget sit amet tellus cras. Tristique senectus et netus et malesuada fames ac turpis egestas. Fusce ut placerat orci nulla pellentesque. Est ullamcorper eget nulla facilisi etiam dignissim diam. Lacus vestibulum sed arcu non odio. Nullam vehicula ipsum a arcu cursus. Cras tincidunt lobortis feugiat vivamus at augue eget. Vel orci porta non pulvinar neque laoreet suspendisse interdum. Dolor sed viverra ipsum nunc. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet dui. Risus at ultrices mi tempus imperdiet.</p>', 1, NULL, 1, 1104), 
(2, 'Sit amet', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Laoreet non curabitur gravida arcu ac. Feugiat in ante metus dictum at. Rhoncus est pellentesque elit ullamcorper. Molestie nunc non blandit massa enim nec dui. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at. Id aliquet lectus proin nibh nisl condimentum id venenatis a. Risus quis varius quam quisque id diam. Turpis in eu mi bibendum neque egestas congue quisque. Nibh nisl condimentum id venenatis. Tempus imperdiet nulla malesuada pellentesque elit. Non blandit massa enim nec.</p>

<p>Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique. Integer malesuada nunc vel risus commodo viverra maecenas accumsan. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Suspendisse potenti nullam ac tortor vitae. Tristique senectus et netus et malesuada. Etiam dignissim diam quis enim lobortis scelerisque fermentum. Dictum sit amet justo donec enim diam vulputate ut pharetra. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Ut tortor pretium viverra suspendisse potenti nullam. Commodo viverra maecenas accumsan lacus vel facilisis volutpat. Nunc consequat interdum varius sit amet mattis vulputate enim. Urna duis convallis convallis tellus id.</p>

<p>Sit amet venenatis urna cursus eget nunc scelerisque. Tortor dignissim convallis aenean et tortor at risus viverra. Adipiscing enim eu turpis egestas pretium aenean pharetra magna ac. At auctor urna nunc id cursus metus. Ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis. Lacus sed turpis tincidunt id aliquet risus. Id donec ultrices tincidunt arcu non. In aliquam sem fringilla ut morbi tincidunt augue. Odio eu feugiat pretium nibh ipsum consequat nisl vel. Aliquam etiam erat velit scelerisque in dictum non consectetur. Mattis ullamcorper velit sed ullamcorper morbi. Volutpat sed cras ornare arcu.</p>

<p>Eget sit amet tellus cras adipiscing enim eu turpis. Nec tincidunt praesent semper feugiat nibh sed. Sem viverra aliquet eget sit amet tellus cras. Ultricies mi quis hendrerit dolor magna. Leo integer malesuada nunc vel risus commodo. Facilisis volutpat est velit egestas dui. Quis hendrerit dolor magna eget est lorem. Proin fermentum leo vel orci porta non pulvinar neque. In vitae turpis massa sed elementum. Leo a diam sollicitudin tempor id eu. Ac auctor augue mauris augue. Ultrices dui sapien eget mi proin sed libero enim sed. Lectus proin nibh nisl condimentum id. Quis vel eros donec ac odio tempor orci dapibus. Vel risus commodo viverra maecenas accumsan. Tempor orci eu lobortis elementum nibh tellus molestie nunc. Dignissim sodales ut eu sem. Massa tincidunt dui ut ornare lectus. Lacus vel facilisis volutpat est velit egestas dui.</p>

<p>Lorem donec massa sapien faucibus et molestie ac. Pulvinar mattis nunc sed blandit libero volutpat sed. Aliquam sem et tortor consequat id. Maecenas sed enim ut sem viverra. Massa sapien faucibus et molestie ac feugiat sed lectus. Amet venenatis urna cursus eget. Quam viverra orci sagittis eu volutpat odio facilisis. Enim eu turpis egestas pretium aenean pharetra magna ac placerat. Sagittis aliquam malesuada bibendum arcu. Feugiat nisl pretium fusce id velit ut tortor pretium. Turpis nunc eget lorem dolor sed viverra ipsum. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Odio eu feugiat pretium nibh ipsum. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. Sapien pellentesque habitant morbi tristique senectus. Varius sit amet mattis vulputate enim nulla aliquet porttitor. Mauris in aliquam sem fringilla ut morbi tincidunt augue. Magna eget est lorem ipsum dolor sit amet consectetur adipiscing.</p>

<p>Fusce id velit ut tortor. Cras sed felis eget velit aliquet sagittis id. Elementum tempus egestas sed sed. Gravida in fermentum et sollicitudin ac. Arcu dui vivamus arcu felis bibendum ut tristique et. Ac turpis egestas integer eget aliquet nibh praesent tristique. Vulputate enim nulla aliquet porttitor. Amet luctus venenatis lectus magna. At lectus urna duis convallis convallis tellus id interdum velit. Arcu ac tortor dignissim convallis aenean et. Fermentum odio eu feugiat pretium nibh ipsum consequat. Urna duis convallis convallis tellus id. Molestie at elementum eu facilisis sed odio. Tempor orci dapibus ultrices in iaculis.</p>

<p>Mattis vulputate enim nulla aliquet porttitor. Purus sit amet volutpat consequat mauris nunc. Urna nunc id cursus metus aliquam eleifend mi. Ullamcorper velit sed ullamcorper morbi tincidunt ornare. Sodales ut eu sem integer vitae justo eget magna fermentum. Odio ut sem nulla pharetra diam sit. Malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Scelerisque felis imperdiet proin fermentum leo vel orci. Magnis dis parturient montes nascetur ridiculus. Non arcu risus quis varius quam quisque id. Ullamcorper sit amet risus nullam eget felis eget. Lacus sed viverra tellus in hac habitasse platea dictumst vestibulum. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Posuere sollicitudin aliquam ultrices sagittis. Phasellus vestibulum lorem sed risus ultricies.</p>

<p>Nec tincidunt praesent semper feugiat nibh. Id interdum velit laoreet id donec ultrices tincidunt. Senectus et netus et malesuada fames ac turpis egestas maecenas. Aliquam sem et tortor consequat id porta nibh. Adipiscing elit ut aliquam purus sit. Aliquet nibh praesent tristique magna. Id velit ut tortor pretium. Quis varius quam quisque id diam. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Id cursus metus aliquam eleifend mi in nulla posuere. Imperdiet proin fermentum leo vel orci porta. Lectus mauris ultrices eros in cursus turpis massa tincidunt. Ut ornare lectus sit amet. Egestas congue quisque egestas diam in arcu. Scelerisque felis imperdiet proin fermentum leo vel orci. In nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. A condimentum vitae sapien pellentesque. A diam maecenas sed enim ut sem viverra. Sed id semper risus in hendrerit gravida rutrum. Enim praesent elementum facilisis leo vel fringilla est ullamcorper eget.</p>', 2, 'hello notes', 1, 946),
(3, 'Eat the fat cats food', "<p>Under the bed purr for no reason so whatever. Flex claws on the human's belly and purr like a lawnmower spit up on light gray carpet instead of adjacent linoleum so rub against owner because nose is wet so slap the dog because cats rule and chase dog then run away go into a room to decide you didn't want to be in there anyway. I'm going to lap some water out of my master's cup meow claw at curtains stretch and yawn nibble on tuna ignore human bite human hand yet lick face hiss at owner, pee a lot, and meow repeatedly scratch at fence purrrrrr eat muffins and poutine until owner comes back. Gimme attention gimme attention gimme attention gimme attention gimme attention gimme attention just kidding i don't want it anymore meow bye. Spot something, big eyes, big eyes, crouch, shake butt, prepare to pounce sleeps on my head or hell is other people. To pet a cat, rub its belly, endure blood and agony, quietly weep, keep rubbing belly meow for sugar, my siamese, stalks me (in a good way), day and night spill litter box, scratch at owner, destroy all furniture, especially couch. Meow go back to sleep owner brings food and water tries to pet on head, so scratch get sprayed by water because bad cat. Tweeting a baseball lie in the sink all day attack the child and ccccccccccccaaaaaaaaaaaaaaatttttttttttttttttssssssssssssssss so sleep over your phone and make cute snoring noises. Ears back wide eyed have a lot of grump in yourself because you can't forget to be grumpy and not be like king grumpy cat.

Sit and stare. Steal raw zucchini off kitchen counter no, you can't close the door, i haven't decided whether or not i wanna go out, cat is love, cat is life fall asleep on the washing machine. Throwup on your pillow run off table persian cat jump eat fish fall asleep upside-down trip owner up in kitchen i want food and meow and walk away, or twitch tail in permanent irritation yet cat mojo . Cat walks in keyboard . Plop down in the middle where everybody walks get video posted to internet for chasing red dot yet leave dead animals as gifts. Mice give me attention or face the wrath of my claws. Car rides are evil stare at imaginary bug and wack the mini furry mouse or asdflkjaertvlkjasntvkjn (sits on keyboard) yet going to catch the red dot today going to catch the red dot today for meow in empty rooms trip on catnip. Ask to be pet then attack owners hand scratch so owner bleeds or claws in your leg love me! but pee in human's bed until he cleans the litter box scratch me now! stop scratching me!. My slave human didn't give me any food so i pooped on the floor human is washing you why halp oh the horror flee scratch hiss bite for has closed eyes but still sees you and tickle my belly at your own peril i will pester for food when you're in the kitchen even if it's salad i am the best for meow meow you are my owner so here is a dead rat yet furball roll roll roll. Meow meow jumps off balcony gives owner dead mouse at present then poops in litter box snatches yarn and fights with dog cat chases laser then plays in grass finds tiny spot in cupboard and sleeps all day jumps in bathtub and meows when owner fills food dish the cat knocks over the food dish cat slides down the water slide and into pool and swims even though it does not like water meow meow we are 3 small kittens sleeping most of our time, we are around 15 weeks old i think, i don’t know i can’t count, while happily ignoring when being called. Scratch my tummy actually i hate you now fight me flex claws on the human's belly and purr like a lawnmower loves cheeseburgers. Chase red laser dot drink water out of the faucet has closed eyes but still sees you but shred all toilet paper and spread around the house stare at the wall, play with food and get confused by dust get poop stuck in paws jumping out of litter box and run around the house scream meowing and smearing hot cat mud all over, or thinking about you i'm joking it's food always food. Push your water glass on the floor play riveting piece on synthesizer keyboard climb a tree, wait for a fireman jump to fireman then scratch his face. Mew mew leave fur on owners clothes yet i hate cucumber pls dont throw it at me oooo! dangly balls! jump swat swing flies so sweetly to the floor crash move on wash belly nap. Kitty kitty pussy cat doll lick master's hand at first then bite because im moody go crazy with excitement when plates are clanked together signalling the arrival of cat food love to play with owner's hair tie. Curl into a furry donut sit as close as possible to warm fire without sitting on cold floor for you are a captive audience while sitting on the toilet, pet me lick left leg for ninety minutes, still dirty instantly break out into full speed gallop across the house for no reason. Get suspicious of own shadow then go play with toilette paper shake treat bag, sleep on dog bed, force dog to sleep on floor i want to go outside let me go outside nevermind inside is better but i cry and cry and cry unless you pet me, and then maybe i cry just for fun meow meow you are my owner so here is a dead bird, scamper. Purr as loud as possible, be the most annoying cat that you can, and, knock everything off the table meowing chowing and wowing yet tweeting a baseball and crash against wall but walk away like nothing happened, yet skid on floor, crash into wall . Bite nose of your human you are a captive audience while sitting on the toilet, pet me. Hunt anything groom yourself 4 hours - checked, have your beauty sleep 18 hours - checked, be fabulous for the rest of the day - checked cat snacks the best thing in the universe is a cardboard box rub whiskers on bare skin act innocent.

Ignore the squirrels, you'll never catch them anyway nyan fluffness ahh cucumber! chase laser but my cat stared at me he was sipping his tea, too jump five feet high and sideways when a shadow moves i'm going to lap some water out of my master's cup meow but ignore the squirrels, you'll never catch them anyway. Pee in human's bed until he cleans the litter box mew mew but use lap as chair, so ask to go outside and ask to come inside and ask to go outside and ask to come inside. Cat fur is the new black hack up furballs so claw your carpet in places everyone can see - why hide my amazing artistic clawing skills?. Morning beauty routine of licking self there's a forty year old lady there let us feast or catching very fast laser pointer yet brown cats with pink ears but purr like an angel steal the warm chair right after you get up kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff. Stare at the wall, play with food and get confused by dust meow meow mama and head nudges but meow go back to sleep owner brings food and water tries to pet on head, so scratch get sprayed by water because bad cat and put toy mouse in food bowl run out of litter box at full speed . Friends are not food chirp at birds jump up to edge of bath, fall in then scramble in a mad panic to get out for climb into cupboard and lick the salt off rice cakes. Stare at imaginary bug bathe private parts with tongue then lick owner's face take a big fluffing crap 💩.

Cat playing a fiddle in hey diddle diddle? try to jump onto window and fall while scratching at wall so sit on the laptop curl into a furry donut. I cry and cry and cry unless you pet me, and then maybe i cry just for fun trip on catnip meow to be let in touch my tail, i shred your hand purrrr or small kitty warm kitty little balls of fur lick the curtain just to be annoying and show belly. Howl uncontrollably for no reason. Eat a plant, kill a hand this cat happen now, it was too purr-fect!!!. Curl into a furry donut i'm going to lap some water out of my master's cup meow. What a cat-ass-trophy! one of these days i'm going to get that red dot, just you wait and see demand to be let outside at once, and expect owner to wait for me as i think about it and play with twist ties annoy owner until he gives you food say meow repeatedly until belly rubs, feels good but cat gets stuck in tree firefighters try to get cat down firefighters get stuck in tree cat eats firefighters' slippers play time. Kitty power this human feeds me, i should be a god or bleghbleghvomit my furball really tie the room together. Purr purr purr until owner pets why owner not pet me hiss scratch meow cats are cute find empty spot in cupboard and sleep all day love you, then bite you. Scream for no reason at 4 am. Go crazy with excitement when plates are clanked together signalling the arrival of cat food wake up human for food at 4am kitty scratches couch bad kitty yet sit in a box for hours so steal mom's crouton while she is in the bathroom, or i do no work yet get food, shelter, and lots of stuff just like man who lives with us meow meow we are 3 small kittens sleeping most of our time, we are around 15 weeks old i think, i don’t know i can’t count. What a cat-ass-trophy! stand with legs in litter box, but poop outside so howl uncontrollably for no reason yet scratch at fleas, meow until belly rubs, hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food. The dog smells bad kitty time but find box a little too small and curl up with fur hanging out or open the door, let me out, let me out, let me-out, let me-aow, let meaow, meaow! avoid the new toy and just play with the box it came in scratch at fleas, meow until belly rubs, hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food but waffles. Claw at curtains stretch and yawn nibble on tuna ignore human bite human hand sniff other cat's butt and hang jaw half open thereafter and cough furball into food bowl then scratch owner for a new one. Destroy couch as revenge why dog in house? i'm the sole ruler of this home and its inhabitants smelly, stupid dogs, inferior furballs time for night-hunt, human freakout run up and down stairs ignore the human until she needs to get up, then climb on her lap and sprawl but reaches under door into adjacent room claw drapes, so scratch so owner bleeds.</p>", 1, NULL, 2, 1931);
SET IDENTITY_INSERT [Chapter] OFF

SET IDENTITY_INSERT [StoryTag] ON
INSERT INTO [StoryTag] ([Id], [StoryId], [TagId])
VALUES (1, 1, 1), (2, 1, 50), (3, 2, 13), (4, 2, 22), (5, 2, 78), (6, 2, 16);
SET IDENTITY_INSERT [StoryTag] OFF

SET IDENTITY_INSERT [StoryGenre] ON
INSERT INTO [StoryGenre] ([Id], [StoryId], [GenreId])
VALUES (1, 1, 1), (2, 1, 12), (3, 2, 6), (4, 2, 2), (5, 2, 8), (6, 2, 4);
SET IDENTITY_INSERT [StoryGenre] OFF

SET IDENTITY_INSERT [Bookmark] ON
INSERT INTO [Bookmark] ([Id], [StoryId], [UserId], [Notes])
VALUES (1, 1, 1, NULL), (2, 1, 2, NULL);
SET IDENTITY_INSERT [Bookmark] OFF