-- Функция для увеличения счетчика при добавлении рецепта для пользователей
CREATE OR REPLACE FUNCTION increment_user_recipe_count() 
RETURNS TRIGGER AS $$
BEGIN
    UPDATE users SET countrecipes = countrecipes + 1 WHERE id = NEW."authorId";
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Функция для уменьшения счетчика при удалении рецепта для пользователей
CREATE OR REPLACE FUNCTION decrement_user_recipe_count() 
RETURNS TRIGGER AS $$
BEGIN
    UPDATE users SET countrecipes = countrecipes - 1 WHERE id = OLD."authorId"; 
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Триггер для добавления рецепта для пользователей
CREATE TRIGGER after_recipe_insert_user
AFTER INSERT ON recipes
FOR EACH ROW
EXECUTE FUNCTION increment_user_recipe_count();

-- Триггер для удаления рецепта для пользователей
CREATE TRIGGER after_recipe_delete_user
AFTER DELETE ON recipes
FOR EACH ROW
EXECUTE FUNCTION decrement_user_recipe_count();
