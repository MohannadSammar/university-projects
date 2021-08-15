<?php declare(strict_types=1);

require_once './Page.php';

class CustomerStatus extends Page
{
    public function __construct()
    {
        parent::__construct();
        // to do: instantiate members representing substructures/blocks
    }

    public function __destruct()
    {
        parent::__destruct();
    }

    public function getViewData(): array
    {
        // to do: fetch data for this view from the database
        // to do: return array containing data
        if (isset($_SESSION["Bestellungs_ID"])) {
            $value = $_SESSION["Bestellungs_ID"];
            $sql =
                "SELECT a.article_id, a.name, a.picture, a.price, oa.ordered_article_id, oa.ordering_id, oa.status
        FROM article a
        INNER JOIN ordered_article oa ON oa.article_id=a.article_id AND oa.ordering_id=$value";

            $recordset = $this->_database->query($sql);
            if (!$recordset) {
                throw new Exception("Abfrage fehlgeschlagen: " . $this->_database->error);
            }

            $elements = array();
            $data = array();
            while ($record = $recordset->fetch_assoc()) {
                $data["article_id"] = $record["article_id"];
                $data["name"] = $record["name"];
                $data["picture"] = $record["picture"];
                $data["price"] = $record["price"];
                $data["ordered_article_id"] = $record["ordered_article_id"];
                $data["ordering_id"] = $record["ordering_id"];
                $data["status"] = $record["status"];
                $elements[$record["ordered_article_id"]] = $data; // Array of arrays
            }

            $recordset->free();
            return $elements;
        }

        return [];
    }

    public function generateView(): void
    {
        header("Content-Type: application/json; charset=UTF-8");
        $data = $this->getViewData(); // NOSONAR ignore unused $data
        //$this->generatePageHeader('to do: change headline');
        // to do: output view of this page using $data
        //$this->generatePageFooter();
        $serializedData = json_encode($data);
        echo $serializedData;
    }

    public function processReceivedData(): void
    {
        parent::processReceivedData();
    }

    public static function main(): void
    {
        session_start();
        try {
            $page = new CustomerStatus();
            $page->processReceivedData();
            $page->generateView();
        } catch (Exception $e) {
            header("Content-type: text/html; charset=UTF-8");
            echo $e->getMessage();
        }
    }
}

CustomerStatus::main();
